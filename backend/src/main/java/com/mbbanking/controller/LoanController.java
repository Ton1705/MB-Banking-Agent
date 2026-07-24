package com.mbbanking.controller;

import com.mbbanking.dto.response.ApiResponse;
import com.mbbanking.dto.response.LoanResponse;
import com.mbbanking.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;
    private static final String DEFAULT_USER = "khanhngoc";

    @GetMapping
    public ResponseEntity<ApiResponse<List<LoanResponse>>> getLoans() {
        return ResponseEntity.ok(ApiResponse.success(loanService.getMyLoans(DEFAULT_USER)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LoanResponse>> getLoanById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(loanService.getLoanById(id)));
    }
}
