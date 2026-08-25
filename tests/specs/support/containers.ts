import { GenericContainer, Network, StartedNetwork, StartedTestContainer, Wait } from "testcontainers";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import * as path from "path";

// Shared Testcontainers setup used by every integration/e2e spec: Network,
// Postgres, WireMock, and the real user-service/bank-account-service/bff-service
// images. Extracted because all specs previously duplicated this boilerplate
// with only env/alias differences.
//
// Moby Ryuk (https://github.com/testcontainers/moby-ryuk):
// Testcontainers automatically runs Ryuk to monitor the test runner's TCP socket
// and garbage-collect all labeled containers, networks, and volumes if tests finish
// or crash unexpectedly.
//
// Debugging tip:
// Set TESTCONTAINERS_RYUK_DISABLED=true to keep containers alive after test run.
if (process.env.TESTCONTAINERS_RYUK_DISABLED === "true") {
  console.log("ℹ️  Moby Ryuk is disabled: containers will persist after test completion for debugging.");
}

export const DB_USER = "app";
export const DB_PASSWORD = "temporary-password-123";
export const DB_NAME = "app";
export const PORT = 8080;
const DATABASE_PORT = 5432;
const HEALTH_PATH = "/health";

const WIREMOCK_MAPPINGS_ROOT = path.resolve(__dirname, "../../../wiremock/mappings");
const WIREMOCK_FILES_ROOT = path.resolve(__dirname, "../../../wiremock/__files");
const WIREMOCK_EXTENSIONS_ROOT = path.resolve(__dirname, "../../../wiremock/extensions");
const DATABASE_ROOT = path.resolve(__dirname, "../../../services");

const SERVICE_NAME = {
  DATABASE: "db",
  USER: "user-service",
  BANK_ACCOUNT: "bank-account-service",
  EKYC: "ekyc-service",
  TRANSFER: "transfer-service",
  OTP: "otp-service",
  SMS: "sms-service",
  BFF: "bff-service",
} as const;

const DATABASE_SERVICES = [
  { name: SERVICE_NAME.USER, hasSeed: true },
  { name: SERVICE_NAME.BANK_ACCOUNT, hasSeed: true },
  { name: SERVICE_NAME.EKYC, hasSeed: false },
  { name: SERVICE_NAME.TRANSFER, hasSeed: false },
] as const;

const databaseScriptDirectory = (serviceName: string, directory: "migration" | "seed") => ({
  source: path.resolve(DATABASE_ROOT, serviceName, "db", directory),
  target: `/test-data/${directory}/${serviceName}`,
});

const DATABASE_SCRIPT_DIRECTORIES = DATABASE_SERVICES.flatMap(({ name, hasSeed }) => [
  databaseScriptDirectory(name, "migration"),
  ...(hasSeed ? [databaseScriptDirectory(name, "seed")] : []),
]);

// Builds a source/target pair for a wiremock/mappings/<name> directory, for
// passing to startWiremock. flat=true copies into the mappings root directly
// (mapping files across dirs must not collide); flat=false (default) keeps
// each dir under its own subpath, avoiding collisions when names differ.
export function wiremockMapping(name: string, opts?: { flat?: boolean }): { source: string; target: string } {
  return {
    source: path.resolve(WIREMOCK_MAPPINGS_ROOT, name),
    target: opts?.flat ? "/home/wiremock/mappings" : `/home/wiremock/mappings/${name}`,
  };
}

export async function startNetwork(): Promise<StartedNetwork> {
  console.log("Setting up test containers network...");
  return new Network().start();
}

export async function startPostgres(network: StartedNetwork): Promise<StartedPostgreSqlContainer> {
  console.log("Starting Postgres container...");
  return new PostgreSqlContainer("postgres:18-alpine")
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.DATABASE)
    .withUsername(DB_USER)
    .withPassword(DB_PASSWORD)
    .withDatabase(DB_NAME)
    .withCopyDirectoriesToContainer(DATABASE_SCRIPT_DIRECTORIES)
    .start();
}

async function runDatabaseScripts(
  database: StartedPostgreSqlContainer,
  directory: "migration" | "seed",
  services: readonly { name: string }[]
): Promise<void> {
  for (const { name } of services) {
    const result = await database.exec([
      "sh",
      "-c",
      `for file in /test-data/${directory}/${name}/*.sql; do [ -e "$file" ] || continue; PGPASSWORD=${database.getPassword()} psql -v ON_ERROR_STOP=1 -U ${database.getUsername()} -d ${database.getDatabase()} -f "$file"; done`,
    ]);
    if (result.exitCode !== 0) {
      throw new Error(`${directory} failed for ${name}: ${result.stderr || result.output}`);
    }
  }
}

export function runMigrations(database: StartedPostgreSqlContainer): Promise<void> {
  return runDatabaseScripts(database, "migration", DATABASE_SERVICES);
}

export function runSeedData(database: StartedPostgreSqlContainer): Promise<void> {
  return runDatabaseScripts(database, "seed", DATABASE_SERVICES.filter(({ hasSeed }) => hasSeed));
}

export async function startWiremock(
  network: StartedNetwork,
  alias: string,
  mappingDirs: { source: string; target: string }[]
): Promise<StartedTestContainer> {
  console.log(`Starting WireMock container (alias "${alias}")...`);
  return new GenericContainer("wiremock/wiremock:latest")
    .withNetwork(network)
    .withNetworkAliases(alias)
    .withExposedPorts(PORT)
    .withCommand([
      "--global-response-templating",
      "--extensions",
      "org.wiremock.RandomExtension",
    ])
    .withCopyFilesToContainer([
      {
        source: path.join(WIREMOCK_EXTENSIONS_ROOT, "wiremock-faker-extension-standalone-0.2.0.jar"),
        target: "/var/wiremock/extensions/wiremock-faker-extension-standalone-0.2.0.jar",
      },
    ])
    .withCopyDirectoriesToContainer([
      ...mappingDirs,
      {
        source: WIREMOCK_FILES_ROOT,
        target: "/home/wiremock/__files",
      },
    ])
    .withWaitStrategy(Wait.forHttp("/__admin/health", PORT))
    .start();
}

function getDatabaseEnvironment(database: StartedPostgreSqlContainer): Record<string, string> {
  return {
    DB_HOST: SERVICE_NAME.DATABASE,
    DB_PORT: DATABASE_PORT.toString(),
    DB_USER: database.getUsername(),
    DB_PASSWORD: database.getPassword(),
    DB_NAME: database.getDatabase(),
  };
}

export async function startUserService(
  network: StartedNetwork,
  database: StartedPostgreSqlContainer,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting user-service container...");
  return new GenericContainer(`${SERVICE_NAME.USER}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.USER)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      ...getDatabaseEnvironment(database),
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startBankAccountService(
  network: StartedNetwork,
  database: StartedPostgreSqlContainer,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting bank-account-service container...");
  return new GenericContainer(`${SERVICE_NAME.BANK_ACCOUNT}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.BANK_ACCOUNT)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      ...getDatabaseEnvironment(database),
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startEKYCService(
  network: StartedNetwork,
  database: StartedPostgreSqlContainer,
  env?: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting ekyc-service container...");
  return new GenericContainer(`${SERVICE_NAME.EKYC}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.EKYC)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      ...getDatabaseEnvironment(database),
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startTransferService(
  network: StartedNetwork,
  database: StartedPostgreSqlContainer,
  env?: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting transfer-service container...");
  return new GenericContainer(`${SERVICE_NAME.TRANSFER}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.TRANSFER)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      ...getDatabaseEnvironment(database),
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startOTPService(
  network: StartedNetwork,
  env?: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting otp-service container...");
  return new GenericContainer(`${SERVICE_NAME.OTP}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.OTP)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      SMS_PROVIDER_URL: "http://wiremock:8080",
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startSMSService(
  network: StartedNetwork,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting sms-service container...");
  return new GenericContainer(`${SERVICE_NAME.SMS}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.SMS)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startBffService(
  network: StartedNetwork,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting bff-service container...");
  return new GenericContainer("bff-service:test")
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.BFF)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      ...env,
    })
    .withWaitStrategy(Wait.forHttp(HEALTH_PATH, PORT))
    .start();
}

export async function startWebsite(
  network: StartedNetwork,
  bffContainer: StartedTestContainer,
  env?: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting website container...");
  return new GenericContainer("website:test")
    .withNetwork(network)
    .withNetworkAliases("website")
    .withExposedPorts(3000)
    .withEnvironment({
      BFF_URL: `http://${bffContainer.getHost()}:${bffContainer.getMappedPort(PORT)}`,
      NEXT_PUBLIC_BFF_URL: `http://${bffContainer.getHost()}:${bffContainer.getMappedPort(PORT)}`,
      HOSTNAME: "0.0.0.0",
      ...env,
    })
    .withWaitStrategy(Wait.forHttp("/", 3000))
    .start();
}

export async function stopAll(
  containers: (StartedTestContainer | undefined)[],
  network?: StartedNetwork
): Promise<void> {
  console.log("Cleaning up test containers...");
  await Promise.all(
    containers
      .filter((container): container is StartedTestContainer => Boolean(container))
      .map((container) => container.stop())
  );
  if (network) await network.stop();
}
