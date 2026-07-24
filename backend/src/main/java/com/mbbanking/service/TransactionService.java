package com.mbbanking.service;

import com.mbbanking.dto.response.TransactionResponse;
import com.mbbanking.entity.User;
import com.mbbanking.entity.Account;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.TransactionMapper;
import com.mbbanking.repository.TransactionRepository;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final TransactionMapper transactionMapper;

    @Transactional(readOnly = true)
    public List<TransactionResponse> getMyTransactions(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        // Module 1 Simulation: just get the primary checking account and return its recent transactions
        if (user.getAccounts().isEmpty()) {
            return List.of();
        }
        
        Account mainAcc = user.getAccounts().get(0);
        Page<TransactionResponse> page = transactionRepository.findAllByAccountId(mainAcc.getId(), PageRequest.of(0, 20))
                .map(transactionMapper::toResponse);
                
        return page.getContent();
    }
}
