CREATE TABLE accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('SAVINGS', 'CHECKING')),
    balance NUMERIC(19,4) NOT NULL DEFAULT 0,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_accounts_owner_name ON accounts(owner_name);