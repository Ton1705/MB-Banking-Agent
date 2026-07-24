package com.mbbanking.dto.response;

import com.mbbanking.enums.CardBrand;
import com.mbbanking.enums.CardStatus;
import com.mbbanking.enums.CardTier;
import com.mbbanking.enums.CardType;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CardResponse {
    private Long id;
    private String cardNumber;
    private CardType cardType;
    private CardBrand cardBrand;
    private CardTier cardTier;
    private String cardHolderName;
    private String expiryDate;
    private BigDecimal creditLimit;
    private BigDecimal availableBalance;
    private BigDecimal usedAmount;
    private CardStatus status;
    private String linkedAccountNumber;
}
