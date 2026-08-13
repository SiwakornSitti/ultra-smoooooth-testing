-- Remove the obsolete column from databases created before the currency refactor.
ALTER TABLE accounts DROP COLUMN IF EXISTS currency;
