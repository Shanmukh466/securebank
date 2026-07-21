CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL,
    message VARCHAR(500) NOT NULL,
    sent_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_transaction_id ON notifications(transaction_id);