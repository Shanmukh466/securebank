package com.securebank.account_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateAccountRequest(
        @NotBlank(message = "ownerName is required")
        String ownerName,

        @NotNull(message = "accountType is required")
        String accountType
) {
}