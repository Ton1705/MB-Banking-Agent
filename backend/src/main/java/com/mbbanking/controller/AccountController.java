package com.mbbanking.controller;

import com.mbbanking.dto.response.AccountResponse;
import com.mbbanking.dto.response.ApiResponse;
import com.mbbanking.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private static final String DEFAULT_USER = "khanhngoc";

    @GetMapping
    public ResponseEntity<ApiResponse<List<AccountResponse>>> getAccounts() {
        return ResponseEntity.ok(ApiResponse.success(accountService.getMyAccounts(DEFAULT_USER)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<AccountResponse>> getAccountById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(accountService.getAccountById(id, DEFAULT_USER)));
    }
}
