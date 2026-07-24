package com.mbbanking.service;

import com.mbbanking.dto.response.AccountResponse;
import com.mbbanking.entity.User;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.AccountMapper;
import com.mbbanking.repository.AccountRepository;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;
    private final AccountMapper accountMapper;

    @Transactional(readOnly = true)
    public List<AccountResponse> getMyAccounts(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
        
        return accountRepository.findAllByUserId(user.getId())
                .stream()
                .map(accountMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public AccountResponse getAccountById(Long id, String username) {
        // In a real app we should check if the account belongs to the user
        return accountRepository.findById(id)
                .map(accountMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Account", "id", id));
    }
}
