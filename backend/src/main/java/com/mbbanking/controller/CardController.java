package com.mbbanking.controller;

import com.mbbanking.dto.response.ApiResponse;
import com.mbbanking.dto.response.CardResponse;
import com.mbbanking.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;
    private static final String DEFAULT_USER = "khanhngoc";

    @GetMapping
    public ResponseEntity<ApiResponse<List<CardResponse>>> getCards() {
        return ResponseEntity.ok(ApiResponse.success(cardService.getMyCards(DEFAULT_USER)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CardResponse>> getCardById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(cardService.getCardById(id)));
    }
}
