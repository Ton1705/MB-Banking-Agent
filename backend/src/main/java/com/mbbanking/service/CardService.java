package com.mbbanking.service;

import com.mbbanking.dto.response.CardResponse;
import com.mbbanking.entity.User;
import com.mbbanking.exception.ResourceNotFoundException;
import com.mbbanking.mapper.CardMapper;
import com.mbbanking.repository.CardRepository;
import com.mbbanking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final CardMapper cardMapper;

    @Transactional(readOnly = true)
    public List<CardResponse> getMyCards(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return cardRepository.findAllByUserId(user.getId())
                .stream()
                .map(cardMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CardResponse getCardById(Long id) {
        return cardRepository.findById(id)
                .map(cardMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Card", "id", id));
    }
}
