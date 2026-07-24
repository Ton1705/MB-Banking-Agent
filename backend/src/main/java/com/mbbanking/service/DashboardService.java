package com.mbbanking.service;

import com.mbbanking.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AccountService accountService;
    private final CardService cardService;
    private final SavingService savingService;
    private final LoanService loanService;
    private final TransactionService transactionService;

    public DashboardResponse getDashboardData(String username) {
        List<AccountResponse> accounts = accountService.getMyAccounts(username);
        
        BigDecimal totalBalance = accounts.stream()
                .map(AccountResponse::getBalance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return DashboardResponse.builder()
                .totalBalance(totalBalance)
                .accounts(accounts)
                .cards(cardService.getMyCards(username))
                .savings(savingService.getMySavings(username))
                .loans(loanService.getMyLoans(username))
                .recentTransactions(transactionService.getMyTransactions(username))
                .build();
    }
}
