import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";

export interface SeedData {
  userName: string;
  userEmail: string;
  userPhone: string;
  sourceBalance: number;
  sourceCurrency: string;
  targetBalance: number;
  targetCurrency: string;
}

export interface DirectSeedIds {
  user: string;
  sourceAccount: string;
  targetAccount: string;
}

export interface SeededIds {
  userId: string;
  sourceAccountId: string;
  targetAccountId: string;
}

const sqlLiteral = (value: string) => `'${value.replaceAll("'", "''")}'`;

export async function seedTestData(
  userServiceUrl: string,
  bankAccountServiceUrl: string,
  data: SeedData
): Promise<SeededIds> {
  console.log("Seeding test data...");

  const createUserRes = await fetch(`${userServiceUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: data.userName, email: data.userEmail, phone: data.userPhone }),
  });
  const createdUser = await createUserRes.json();

  const sourceAccountResponse = await fetch(`${bankAccountServiceUrl}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: createdUser.id,
      balance: data.sourceBalance,
      currency: data.sourceCurrency,
    }),
  });
  const sourceAccount = await sourceAccountResponse.json();

  const targetAccountResponse = await fetch(`${bankAccountServiceUrl}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: createdUser.id,
      balance: data.targetBalance,
      currency: data.targetCurrency,
    }),
  });
  const targetAccount = await targetAccountResponse.json();

  return {
    userId: createdUser.id,
    sourceAccountId: sourceAccount.id,
    targetAccountId: targetAccount.id,
  };
}

export async function seedTestDataDirectly(
  database: StartedPostgreSqlContainer,
  data: SeedData,
  ids: DirectSeedIds
): Promise<SeededIds> {
  console.log("Seeding test data directly into Postgres...");

  const sql = `
    INSERT INTO users (id, name, email, phone, status)
    VALUES (
      ${sqlLiteral(ids.user)},
      ${sqlLiteral(data.userName)},
      ${sqlLiteral(data.userEmail)},
      ${sqlLiteral(data.userPhone)},
      'active'
    )
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email,
      phone = EXCLUDED.phone, status = EXCLUDED.status;

    INSERT INTO accounts (id, user_id, balance, currency)
    VALUES
      (${sqlLiteral(ids.sourceAccount)}, ${sqlLiteral(ids.user)}, ${data.sourceBalance}, ${sqlLiteral(data.sourceCurrency)}),
      (${sqlLiteral(ids.targetAccount)}, ${sqlLiteral(ids.user)}, ${data.targetBalance}, ${sqlLiteral(data.targetCurrency)})
    ON CONFLICT (id) DO UPDATE SET balance = EXCLUDED.balance, currency = EXCLUDED.currency;
  `;
  const result = await database.exec([
    "psql",
    "-U",
    database.getUsername(),
    "-d",
    database.getDatabase(),
    "-v",
    "ON_ERROR_STOP=1",
    "-c",
    sql,
  ]);
  if (result.exitCode !== 0) {
    throw new Error(`Direct database seed failed: ${result.stderr || result.output}`);
  }

  return {
    userId: ids.user,
    sourceAccountId: ids.sourceAccount,
    targetAccountId: ids.targetAccount,
  };
}
