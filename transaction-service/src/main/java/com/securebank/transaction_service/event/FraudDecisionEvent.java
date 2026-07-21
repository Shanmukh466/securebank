package com.securebank.transaction_service.event;

import java.time.Instant;
import java.util.UUID;

public record FraudDecisionEvent(
        UUID eventId,
        UUID transactionId,
        String decision,
        String reason,
        Instant timestamp
) {
}