package com.mbbanking.repository;

import com.mbbanking.entity.Account;
import com.mbbanking.enums.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);

    List<Account> findAllByUserId(Long userId);

    List<Account> findAllByUserIdAndAccountType(Long userId, AccountType accountType);

    boolean existsByAccountNumber(String accountNumber);
}
