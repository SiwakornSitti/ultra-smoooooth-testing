import { EKYC_CUSTOMERS } from "./ekyc-customers";

const NATIONAL_ID_STORAGE_PREFIX = "qa-national-id:";

function generateNationalId() {
  return `${Math.floor(Math.random() * 9) + 1}${Math.floor(Math.random() * 1_000_000_000_000)
    .toString()
    .padStart(12, "0")}`;
}

export function getOrCreateNationalId(userId: string) {
  const seededCustomer = EKYC_CUSTOMERS.find((customer) => customer.id === userId);
  if (seededCustomer) return seededCustomer.nationalId;

  const storageKey = `${NATIONAL_ID_STORAGE_PREFIX}${userId}`;
  const existingNationalId = window.sessionStorage.getItem(storageKey);
  if (existingNationalId) return existingNationalId;

  const nationalId = generateNationalId();
  window.sessionStorage.setItem(storageKey, nationalId);
  return nationalId;
}
