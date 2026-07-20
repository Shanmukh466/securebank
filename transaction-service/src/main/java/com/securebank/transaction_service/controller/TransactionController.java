package com.securebank.transaction_service.controller;

import com.securebank.transaction_service.dto.TransactionStatusResponse;
import com.securebank.transaction_service.dto.TransferRequest;
import com.securebank.transaction_service.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/transfer")
    public ResponseEntity<TransactionStatusResponse> transfer(@Valid @RequestBody TransferRequest request) {
        TransactionStatusResponse response = transactionService.initiateTransfer(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @GetMapping("/{transactionId}")
    public ResponseEntity<TransactionStatusResponse> getTransaction(@PathVariable UUID transactionId) {
        TransactionStatusResponse response = transactionService.getTransaction(transactionId);
        return ResponseEntity.ok(response);
    }
}