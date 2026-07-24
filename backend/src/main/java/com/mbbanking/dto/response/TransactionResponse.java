package com.mbbanking.dto.response;

import com.mbbanking.enums.TransactionStatus;
import com.mbbanking.enums.TransactionType;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TransactionResponse {
    private Long id;
    private String referenceCode;
    private TransactionType transactionType;
    private TransactionStatus status;
    private BigDecimal amount;
    private BigDecimal balanceBefore;
    private BigDecimal balanceAfter;
    private String description;
    private String destinationBank;
    private String destinationName;
    private LocalDateTime createdAt;
    private Long sourceAccountId;
    private Long destinationAccountId;
}
