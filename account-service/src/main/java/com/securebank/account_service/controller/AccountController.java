package com.securebank.account_service.controller;

import com.securebank.account_service.dto.AccountResponse;
import com.securebank.account_service.dto.CreateAccountRequest;
import com.securebank.account_service.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final AccountService accountService;

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody CreateAccountRequest request) {
        AccountResponse response = accountService.createAccount(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountResponse> getAccount(@PathVariable UUID accountId) {
        AccountResponse response = accountService.getAccount(accountId);
        return ResponseEntity.ok(response);
    }
}