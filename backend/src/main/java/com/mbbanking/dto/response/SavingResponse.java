package com.mbbanking.dto.response;

import com.mbbanking.enums.SavingStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class SavingResponse {
    private Long id;
    private String savingCode;
    private String savingName;
    private BigDecimal amount;
    private BigDecimal interestRate;
    private Integer termMonths;
    private LocalDate startDate;
    private LocalDate maturityDate;
    private SavingStatus status;
    private String autoRenew;
    private String linkedAccountNumber;
}
