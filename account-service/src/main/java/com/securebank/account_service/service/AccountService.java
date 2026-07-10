package com.securebank.account_service.service;

import com.securebank.account_service.dto.AccountResponse;
import com.securebank.account_service.dto.CreateAccountRequest;
import com.securebank.account_service.entity.Account;
import com.securebank.account_service.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public AccountResponse createAccount(CreateAccountRequest request) {
        Account account = Account.builder()
                .ownerName(request.ownerName())
                .accountType(Account.AccountType.valueOf(request.accountType().toUpperCase()))
                .balance(BigDecimal.ZERO)
                .currency("USD")
                .build();

        Account saved = accountRepository.save(account);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public AccountResponse getAccount(UUID accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NoSuchElementException("Account not found: " + accountId));
        return toResponse(account);
    }

      @Transactional(readOnly = true)
    public List<AccountResponse> getAllAccounts() {
        return accountRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private AccountResponse toResponse(Account account) {
        return new AccountResponse(
                account.getAccountId(),
                account.getOwnerName(),
                account.getAccountType().name(),
                account.getBalance(),
                account.getCurrency(),
                account.getCreatedAt()
        );
    }
}