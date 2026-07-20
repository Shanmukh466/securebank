package com.securebank.transaction_service.service;

import com.securebank.transaction_service.dto.TransactionStatusResponse;
import com.securebank.transaction_service.dto.TransferRequest;
import com.securebank.transaction_service.entity.Transaction;
import com.securebank.transaction_service.event.TransactionInitiatedEvent;
import com.securebank.transaction_service.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private static final String TOPIC = "transaction.initiated";

    private final TransactionRepository transactionRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Transactional
    public TransactionStatusResponse initiateTransfer(TransferRequest request) {

        if (request.fromAccountId().equals(request.toAccountId())) {
            throw new IllegalArgumentException("Cannot transfer to the same account");
        }

        Transaction transaction = Transaction.builder()
                .fromAccountId(request.fromAccountId())
                .toAccountId(request.toAccountId())
                .amount(request.amount())
                .currency(request.currency())
                .idempotencyKey(request.idempotencyKey())
                .build();

        Transaction saved = transactionRepository.save(transaction);

        TransactionInitiatedEvent event = TransactionInitiatedEvent.of(
                saved.getTransactionId(),
                saved.getFromAccountId(),
                saved.getToAccountId(),
                saved.getAmount(),
                saved.getCurrency()
        );
        kafkaTemplate.send(TOPIC, saved.getTransactionId().toString(), event);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public TransactionStatusResponse getTransaction(UUID transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new NoSuchElementException("Transaction not found: " + transactionId));
        return toResponse(transaction);
    }

    private TransactionStatusResponse toResponse(Transaction t) {
        return new TransactionStatusResponse(
                t.getTransactionId(),
                t.getFromAccountId(),
                t.getToAccountId(),
                t.getAmount(),
                t.getCurrency(),
                t.getStatus().name(),
                t.getCreatedAt()
        );
    }
}