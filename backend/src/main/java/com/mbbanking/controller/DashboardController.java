package com.mbbanking.controller;

import com.mbbanking.dto.response.ApiResponse;
import com.mbbanking.dto.response.DashboardResponse;
import com.mbbanking.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private static final String DEFAULT_USER = "khanhngoc";

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getDashboardData(DEFAULT_USER)));
    }
}
