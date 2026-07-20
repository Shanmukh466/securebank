package com.securebank.fraud_service.service;

import com.securebank.fraud_service.entity.FraudCheck;
import com.securebank.fraud_service.event.FraudDecisionEvent;
import com.securebank.fraud_service.event.TransactionInitiatedEvent;
import com.securebank.fraud_service.repository.FraudCheckRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class FraudCheckService {

    private static final BigDecimal FLAG_THRESHOLD = new BigDecimal("10000");
    private static final String DECISION_TOPIC = "transaction.fraud-decision";

    private final FraudCheckRepository fraudCheckRepository;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "transaction.initiated", groupId = "fraud-service-group")
    @Transactional
    public void handleTransactionInitiated(TransactionInitiatedEvent event) {
        log.info("Received transaction for fraud check: {}", event.transactionId());

        if (fraudCheckRepository.findAll().stream()
                .anyMatch(fc -> fc.getTransactionId().equals(event.transactionId()))) {
            log.warn("Transaction {} already checked, skipping", event.transactionId());
            return;
        }

        FraudCheck.Decision decision;
        String reason = null;

        if (event.amount().compareTo(FLAG_THRESHOLD) > 0) {
            decision = FraudCheck.Decision.FLAGGED;
            reason = "Amount exceeds $" + FLAG_THRESHOLD + " threshold";
        } else {
            decision = FraudCheck.Decision.APPROVED;
        }

        FraudCheck fraudCheck = FraudCheck.builder()
                .transactionId(event.transactionId())
                .decision(decision)
                .reason(reason)
                .build();
        fraudCheckRepository.save(fraudCheck);

        FraudDecisionEvent decisionEvent = FraudDecisionEvent.of(
                event.transactionId(),
                decision.name(),
                reason
        );
        kafkaTemplate.send(DECISION_TOPIC, event.transactionId().toString(), decisionEvent);

        log.info("Transaction {} decision: {}", event.transactionId(), decision);
    }
}