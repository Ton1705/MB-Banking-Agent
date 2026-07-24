package com.mbbanking.dto.response;

import com.mbbanking.enums.LoanStatus;
import com.mbbanking.enums.LoanType;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class LoanResponse {
    private Long id;
    private String loanCode;
    private LoanType loanType;
    private BigDecimal loanAmount;
    private BigDecimal remainingBalance;
    private BigDecimal interestRate;
    private Integer termMonths;
    private BigDecimal monthlyPayment;
    private LocalDate startDate;
    private LocalDate nextPaymentDate;
    private LocalDate endDate;
    private LoanStatus status;
    private String collateral;
    private String linkedAccountNumber;
}
