package com.mbbanking.service;

import com.mbbanking.dto.response.UserResponse;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.UserMapper;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public UserResponse getProfile(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
    }
}
