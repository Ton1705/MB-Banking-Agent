package com.mbbanking.config;

import com.mbbanking.entity.*;
import com.mbbanking.enums.*;
import com.mbbanking.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final CardRepository cardRepository;
    private final SavingRepository savingRepository;
    private final LoanRepository loanRepository;
    private final TransactionRepository transactionRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            log.info("Bắt đầu seed dữ liệu mẫu...");
            seedData();
            log.info("Hoàn tất seed dữ liệu.");
        } else {
            log.info("Dữ liệu mẫu đã tồn tại, bỏ qua seed.");
        }
    }

    private void seedData() {
        // 1. User
        User user = User.builder()
                .username("khanhngoc")
                .email("khanhngoc@mbbank.vn")
                .password(passwordEncoder.encode("123456"))
                .fullName("Lê Khánh Ngọc")
                .phoneNumber("0901234567")
                .role(Role.USER)
                .isActive(true)
                .build();
        userRepository.save(user);

        // 2. Accounts
        Account checkingAcc = Account.builder()
                .accountNumber("MB0123456789")
                .accountType(AccountType.CHECKING)
                .balance(new BigDecimal("125750000"))
                .user(user)
                .build();
        
        Account savingsAcc = Account.builder()
                .accountNumber("MB9876543210")
                .accountType(AccountType.SAVINGS)
                .balance(new BigDecimal("450000000"))
                .user(user)
                .build();
        accountRepository.saveAll(List.of(checkingAcc, savingsAcc));

        // 3. Cards
        Card visaDebit = Card.builder()
                .cardNumber("4123456789012345")
                .cardType(CardType.DEBIT)
                .cardBrand(CardBrand.VISA)
                .cardTier(CardTier.PLATINUM)
                .cardHolderName("LE KHANH NGOC")
                .expiryDate("12/28")
                .status(CardStatus.ACTIVE)
                .linkedAccountNumber(checkingAcc.getAccountNumber())
                .user(user)
                .build();

        Card masterCredit = Card.builder()
                .cardNumber("5123456789012345")
                .cardType(CardType.CREDIT)
                .cardBrand(CardBrand.MASTERCARD)
                .cardTier(CardTier.GOLD)
                .cardHolderName("LE KHANH NGOC")
                .expiryDate("10/27")
                .creditLimit(new BigDecimal("100000000"))
                .availableBalance(new BigDecimal("75000000"))
                .usedAmount(new BigDecimal("25000000"))
                .status(CardStatus.ACTIVE)
                .user(user)
                .build();
                
        Card jcbDebit = Card.builder()
                .cardNumber("3528456789012345")
                .cardType(CardType.DEBIT)
                .cardBrand(CardBrand.JCB)
                .cardTier(CardTier.STANDARD)
                .cardHolderName("LE KHANH NGOC")
                .expiryDate("05/26")
                .status(CardStatus.LOCKED)
                .linkedAccountNumber(savingsAcc.getAccountNumber())
                .user(user)
                .build();
        cardRepository.saveAll(List.of(visaDebit, masterCredit, jcbDebit));

        // 4. Savings
        Saving saving1 = Saving.builder()
                .savingCode("SV202601")
                .savingName("Tiết kiệm mua nhà")
                .amount(new BigDecimal("200000000"))
                .interestRate(new BigDecimal("5.5"))
                .termMonths(6)
                .startDate(LocalDate.now().minusMonths(2))
                .maturityDate(LocalDate.now().plusMonths(4))
                .status(SavingStatus.ACTIVE)
                .linkedAccountNumber(checkingAcc.getAccountNumber())
                .user(user)
                .build();
                
        Saving saving2 = Saving.builder()
                .savingCode("SV202602")
                .savingName("Tiết kiệm dài hạn")
                .amount(new BigDecimal("250000000"))
                .interestRate(new BigDecimal("6.8"))
                .termMonths(12)
                .startDate(LocalDate.now().minusMonths(5))
                .maturityDate(LocalDate.now().plusMonths(7))
                .status(SavingStatus.ACTIVE)
                .linkedAccountNumber(checkingAcc.getAccountNumber())
                .user(user)
                .build();
        savingRepository.saveAll(List.of(saving1, saving2));

        // 5. Loans
        Loan loan1 = Loan.builder()
                .loanCode("LN202501")
                .loanType(LoanType.MORTGAGE)
                .loanAmount(new BigDecimal("1500000000"))
                .remainingBalance(new BigDecimal("1200000000"))
                .interestRate(new BigDecimal("8.5"))
                .termMonths(120)
                .monthlyPayment(new BigDecimal("18500000"))
                .startDate(LocalDate.now().minusYears(2))
                .nextPaymentDate(LocalDate.now().plusDays(15))
                .endDate(LocalDate.now().plusYears(8))
                .status(LoanStatus.ACTIVE)
                .linkedAccountNumber(checkingAcc.getAccountNumber())
                .user(user)
                .build();
                
        Loan loan2 = Loan.builder()
                .loanCode("LN202601")
                .loanType(LoanType.PERSONAL)
                .loanAmount(new BigDecimal("50000000"))
                .remainingBalance(new BigDecimal("25000000"))
                .interestRate(new BigDecimal("12.0"))
                .termMonths(24)
                .monthlyPayment(new BigDecimal("2350000"))
                .startDate(LocalDate.now().minusMonths(10))
                .nextPaymentDate(LocalDate.now().plusDays(5))
                .endDate(LocalDate.now().plusMonths(14))
                .status(LoanStatus.ACTIVE)
                .linkedAccountNumber(checkingAcc.getAccountNumber())
                .user(user)
                .build();
        loanRepository.saveAll(List.of(loan1, loan2));

        // 6. Transactions (Sample of 5, frontend requires 40 but 5 is enough for DB seed, others can be generated)
        for (int i = 1; i <= 20; i++) {
            Transaction t1 = Transaction.builder()
                    .referenceCode("TXN202607" + String.format("%03d", i*2))
                    .transactionType(TransactionType.TRANSFER)
                    .status(TransactionStatus.COMPLETED)
                    .amount(new BigDecimal("500000").multiply(new BigDecimal(i)))
                    .balanceBefore(new BigDecimal("130000000"))
                    .balanceAfter(new BigDecimal("129500000"))
                    .description("Chuyển khoản " + i)
                    .sourceAccount(checkingAcc)
                    .build();
            transactionRepository.save(t1);

            Transaction t2 = Transaction.builder()
                    .referenceCode("TXN202607" + String.format("%03d", i*2+1))
                    .transactionType(TransactionType.DEPOSIT)
                    .status(TransactionStatus.COMPLETED)
                    .amount(new BigDecimal("1000000").multiply(new BigDecimal(i)))
                    .balanceBefore(new BigDecimal("128500000"))
                    .balanceAfter(new BigDecimal("129500000"))
                    .description("Nhận tiền " + i)
                    .destinationAccount(checkingAcc)
                    .build();
            transactionRepository.save(t2);
        }

        // 7. Notifications
        for (int i = 1; i <= 10; i++) {
            Notification notif = Notification.builder()
                    .title("Thông báo " + i)
                    .message("Chi tiết thông báo số " + i + " dành cho bạn.")
                    .type(i % 2 == 0 ? NotificationType.TRANSACTION : NotificationType.PROMOTION)
                    .isRead(i <= 3)
                    .user(user)
                    .build();
            notificationRepository.save(notif);
        }
    }
}
