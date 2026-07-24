package com.mbbanking.mapper;

import com.mbbanking.dto.response.CardResponse;
import com.mbbanking.entity.Card;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CardMapper {
    CardResponse toResponse(Card entity);
}
