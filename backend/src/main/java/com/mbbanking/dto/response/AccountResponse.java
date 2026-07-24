package com.mbbanking.dto.response;

import com.mbbanking.enums.AccountType;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class AccountResponse {
    private Long id;
    private String accountNumber;
    private String accountName;
    private AccountType accountType;
    private BigDecimal balance;
    private String currency;
    private String branch;
    private Boolean isActive;
}
