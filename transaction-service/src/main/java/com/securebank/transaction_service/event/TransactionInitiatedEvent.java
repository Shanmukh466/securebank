package com.securebank.transaction_service.event;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

public record TransactionInitiatedEvent(
        UUID eventId,
        UUID transactionId,
        UUID fromAccountId,
        UUID toAccountId,
        BigDecimal amount,
        String currency,
        Instant timestamp
) {
    public static TransactionInitiatedEvent of(UUID transactionId, UUID fromAccountId, UUID toAccountId, BigDecimal amount, String currency) {
        return new TransactionInitiatedEvent(
                UUID.randomUUID(),
                transactionId,
                fromAccountId,
                toAccountId,
                amount,
                currency,
                Instant.now()
        );
    }
}