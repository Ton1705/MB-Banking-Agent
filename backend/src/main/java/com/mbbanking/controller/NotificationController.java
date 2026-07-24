package com.mbbanking.controller;

import com.mbbanking.dto.response.ApiResponse;
import com.mbbanking.dto.response.NotificationResponse;
import com.mbbanking.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private static final String DEFAULT_USER = "khanhngoc";

    @GetMapping
    public ResponseEntity<ApiResponse<List<NotificationResponse>>> getNotifications() {
        return ResponseEntity.ok(ApiResponse.success(notificationService.getMyNotifications(DEFAULT_USER)));
    }
}
