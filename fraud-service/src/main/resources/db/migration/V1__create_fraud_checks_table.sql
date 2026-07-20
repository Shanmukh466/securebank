CREATE TABLE fraud_checks (
    fraud_check_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL UNIQUE,
    decision VARCHAR(20) NOT NULL CHECK (decision IN ('APPROVED', 'FLAGGED')),
    reason VARCHAR(255),
    checked_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_fraud_checks_transaction_id ON fraud_checks(transaction_id);