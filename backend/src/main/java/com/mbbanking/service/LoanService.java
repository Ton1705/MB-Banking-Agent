package com.mbbanking.service;

import com.mbbanking.dto.response.LoanResponse;
import com.mbbanking.entity.User;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.LoanMapper;
import com.mbbanking.repository.LoanRepository;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final LoanMapper loanMapper;

    @Transactional(readOnly = true)
    public List<LoanResponse> getMyLoans(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return loanRepository.findAllByUserId(user.getId())
                .stream()
                .map(loanMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LoanResponse getLoanById(Long id) {
        return loanRepository.findById(id)
                .map(loanMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Loan", "id", id));
    }
}
