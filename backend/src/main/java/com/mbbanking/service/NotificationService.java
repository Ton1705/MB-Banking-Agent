package com.mbbanking.service;

import com.mbbanking.dto.response.NotificationResponse;
import com.mbbanking.entity.User;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.NotificationMapper;
import com.mbbanking.repository.NotificationRepository;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final NotificationMapper notificationMapper;

    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyNotifications(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return notificationRepository.findAllByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(notificationMapper::toResponse)
                .collect(Collectors.toList());
    }
}
