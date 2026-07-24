package com.mbbanking.repository;

import com.mbbanking.entity.Transaction;
import com.mbbanking.enums.TransactionStatus;
import com.mbbanking.enums.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Optional<Transaction> findByReferenceCode(String referenceCode);

    // Lấy tất cả giao dịch của một tài khoản (cả gửi lẫn nhận)
    @Query("""
            SELECT t FROM Transaction t
            WHERE t.sourceAccount.id = :accountId
               OR t.destinationAccount.id = :accountId
            ORDER BY t.createdAt DESC
            """)
    Page<Transaction> findAllByAccountId(@Param("accountId") Long accountId, Pageable pageable);

    // Lọc theo type
    @Query("""
            SELECT t FROM Transaction t
            WHERE (t.sourceAccount.id = :accountId OR t.destinationAccount.id = :accountId)
              AND t.transactionType = :type
            ORDER BY t.createdAt DESC
            """)
    Page<Transaction> findByAccountIdAndType(
            @Param("accountId") Long accountId,
            @Param("type") TransactionType type,
            Pageable pageable);

    // Lọc theo status
    @Query("""
            SELECT t FROM Transaction t
            WHERE (t.sourceAccount.id = :accountId OR t.destinationAccount.id = :accountId)
              AND t.status = :status
            ORDER BY t.createdAt DESC
            """)
    Page<Transaction> findByAccountIdAndStatus(
            @Param("accountId") Long accountId,
            @Param("status") TransactionStatus status,
            Pageable pageable);
}
