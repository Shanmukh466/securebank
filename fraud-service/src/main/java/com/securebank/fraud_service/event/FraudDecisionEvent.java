package com.securebank.fraud_service.event;

import java.time.Instant;
import java.util.UUID;

public record FraudDecisionEvent(
        UUID eventId,
        UUID transactionId,
        String decision,
        String reason,
        Instant timestamp
) {
    public static FraudDecisionEvent of(UUID transactionId, String decision, String reason) {
        return new FraudDecisionEvent(
                UUID.randomUUID(),
                transactionId,
                decision,
                reason,
                Instant.now()
        );
    }
}