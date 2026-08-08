export const ACCOUNT_OPTIONS = [
  {
    id: "00000000-0000-0000-0000-000000000011",
    number: "00000011",
  },
  {
    id: "00000000-0000-0000-0000-000000000012",
    number: "00000012",
  },
] as const;

export const INVALID_ACCOUNT_OPTION = {
  id: "00000000-0000-0000-0000-000099999999",
  number: "99999",
} as const;

export function getAccountNumber(accountId: string) {
  if (accountId === INVALID_ACCOUNT_OPTION.id) return INVALID_ACCOUNT_OPTION.number;
  const configuredNumber = ACCOUNT_OPTIONS.find((account) => account.id === accountId)?.number;
  if (configuredNumber) return configuredNumber;
  return accountId.replaceAll("-", "").slice(-8);
}
