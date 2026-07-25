CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    balance NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL
);
