package com.securebank.account_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record AccountResponse(
        UUID accountId,
        String ownerName,
        String accountType,
        BigDecimal balance,
        String currency,
        LocalDateTime createdAt
) {
}