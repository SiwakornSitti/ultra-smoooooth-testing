import { GenericContainer, Network, StartedNetwork, StartedTestContainer, Wait } from "testcontainers";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import * as path from "path";

// Shared Testcontainers setup used by every integration/e2e spec: Network,
// Postgres, WireMock, and the real user-service/bank-account-service/bff-service
// images. Extracted because all specs previously duplicated this boilerplate
// with only env/alias differences.

export const DB_USER = "app";
export const DB_PASSWORD = "temporary-password-123";
export const DB_NAME = "app";
export const PORT = 8080;

const WIREMOCK_MAPPINGS_ROOT = path.resolve(__dirname, "../../../wiremock/mappings");
const WIREMOCK_EXTENSIONS_ROOT = path.resolve(__dirname, "../../../wiremock/extensions");
const DATABASE_ROOT = path.resolve(__dirname, "../../../services");

const SERVICE_NAME = {
  DATABASE: "db",
  USER: "user-service",
  BANK_ACCOUNT: "bank-account-service",
  EKYC: "ekyc-service",
  TRANSFER: "transfer-service",
  BFF: "bff-service",
} as const;

const DATABASE_SERVICES = [
  { name: SERVICE_NAME.USER, hasSeed: true },
  { name: SERVICE_NAME.BANK_ACCOUNT, hasSeed: true },
  { name: SERVICE_NAME.EKYC, hasSeed: false },
  { name: SERVICE_NAME.TRANSFER, hasSeed: false },
] as const;

const databaseInitDirectory = (serviceName: string, directory: "migration" | "seed") => ({
  source: path.resolve(DATABASE_ROOT, serviceName, "db", directory),
  target: "/docker-entrypoint-initdb.d",
});

const DATABASE_INIT_DIRECTORIES = DATABASE_SERVICES.flatMap(({ name, hasSeed }) => [
  databaseInitDirectory(name, "migration"),
  ...(hasSeed ? [databaseInitDirectory(name, "seed")] : []),
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
    .withCopyDirectoriesToContainer(DATABASE_INIT_DIRECTORIES)
    .start();
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
    .withCopyDirectoriesToContainer(mappingDirs)
    .withWaitStrategy(Wait.forHttp("/__admin/health", PORT))
    .start();
}

export async function startUserService(
  network: StartedNetwork,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting user-service container...");
  return new GenericContainer(`${SERVICE_NAME.USER}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.USER)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      DB_HOST: "db",
      DB_PORT: "5432",
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      ...env,
    })
    .withWaitStrategy(Wait.forHttp("/health", PORT))
    .start();
}

export async function startBankAccountService(
  network: StartedNetwork,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting bank-account-service container...");
  return new GenericContainer(`${SERVICE_NAME.BANK_ACCOUNT}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.BANK_ACCOUNT)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      DB_HOST: "db",
      DB_PORT: "5432",
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      ...env,
    })
    .withWaitStrategy(Wait.forHttp("/health", PORT))
    .start();
}

export async function startEkycService(
  network: StartedNetwork,
  env?: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting ekyc-service container...");
  return new GenericContainer(`${SERVICE_NAME.EKYC}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.EKYC)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      DB_HOST: "db",
      DB_PORT: "5432",
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      ...env,
    })
    .withWaitStrategy(Wait.forHttp("/health", PORT))
    .start();
}

export async function startTransferService(
  network: StartedNetwork,
  env?: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting transfer-service container...");
  return new GenericContainer(`${SERVICE_NAME.TRANSFER}:test`)
    .withNetwork(network)
    .withNetworkAliases(SERVICE_NAME.TRANSFER)
    .withExposedPorts(PORT)
    .withEnvironment({
      PORT: PORT.toString(),
      DB_HOST: "db",
      DB_PORT: "5432",
      DB_USER,
      DB_PASSWORD,
      DB_NAME,
      ...env,
    })
    .withWaitStrategy(Wait.forHttp("/health", PORT))
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
    .withWaitStrategy(Wait.forHttp("/health", PORT))
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
