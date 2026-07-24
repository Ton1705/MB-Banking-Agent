package com.mbbanking.service;

import com.mbbanking.dto.response.SavingResponse;
import com.mbbanking.entity.User;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.SavingMapper;
import com.mbbanking.repository.SavingRepository;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingService {

    private final SavingRepository savingRepository;
    private final UserRepository userRepository;
    private final SavingMapper savingMapper;

    @Transactional(readOnly = true)
    public List<SavingResponse> getMySavings(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return savingRepository.findAllByUserId(user.getId())
                .stream()
                .map(savingMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SavingResponse getSavingById(Long id) {
        return savingRepository.findById(id)
                .map(savingMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Saving", "id", id));
    }
}
