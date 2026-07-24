package com.mbbanking.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class DashboardResponse {
    private BigDecimal totalBalance;
    private List<AccountResponse> accounts;
    private List<CardResponse> cards;
    private List<SavingResponse> savings;
    private List<LoanResponse> loans;
    private List<TransactionResponse> recentTransactions;
}
