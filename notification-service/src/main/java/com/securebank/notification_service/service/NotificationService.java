package com.securebank.notification_service.service;

import com.securebank.notification_service.entity.Notification;
import com.securebank.notification_service.event.FraudDecisionEvent;
import com.securebank.notification_service.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @KafkaListener(topics = "transaction.fraud-decision", groupId = "notification-service-group")
    @Transactional
    public void handleFraudDecision(FraudDecisionEvent event) {
        String message = "APPROVED".equals(event.decision())
                ? "Your transfer has been completed successfully."
                : "Your transfer has been flagged for review: " + event.reason();

        Notification notification = Notification.builder()
                .transactionId(event.transactionId())
                .message(message)
                .build();

        notificationRepository.save(notification);

        log.info(">>> NOTIFICATION SENT — Transaction {}: \"{}\"", event.transactionId(), message);
    }
}