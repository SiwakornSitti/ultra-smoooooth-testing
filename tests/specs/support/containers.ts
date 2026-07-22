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
    .withNetworkAliases("db")
    .withUsername(DB_USER)
    .withPassword(DB_PASSWORD)
    .withDatabase(DB_NAME)
    .withCopyDirectoriesToContainer([
      {
        source: path.resolve(__dirname, "../../../k8s/migrations"),
        target: "/docker-entrypoint-initdb.d",
      },
    ])
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
    .withCommand(["--global-response-templating"])
    .withCopyDirectoriesToContainer(mappingDirs)
    .withWaitStrategy(Wait.forHttp("/__admin/health", PORT))
    .start();
}

export async function startUserService(
  network: StartedNetwork,
  env: Record<string, string>
): Promise<StartedTestContainer> {
  console.log("Starting user-service container...");
  return new GenericContainer("user-service:test")
    .withNetwork(network)
    .withNetworkAliases("user-service")
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
  return new GenericContainer("bank-account-service:test")
    .withNetwork(network)
    .withNetworkAliases("bank-account-service")
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
    .withNetworkAliases("bff-service")
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
  for (const c of containers) {
    if (c) await c.stop();
  }
  if (network) await network.stop();
}
