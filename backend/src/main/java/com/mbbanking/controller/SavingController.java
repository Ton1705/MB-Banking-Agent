package com.mbbanking.controller;

import com.mbbanking.dto.response.ApiResponse;
import com.mbbanking.dto.response.SavingResponse;
import com.mbbanking.service.SavingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/savings")
@RequiredArgsConstructor
public class SavingController {

    private final SavingService savingService;
    private static final String DEFAULT_USER = "khanhngoc";

    @GetMapping
    public ResponseEntity<ApiResponse<List<SavingResponse>>> getSavings() {
        return ResponseEntity.ok(ApiResponse.success(savingService.getMySavings(DEFAULT_USER)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SavingResponse>> getSavingById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(savingService.getSavingById(id)));
    }
}
