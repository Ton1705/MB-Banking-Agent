package com.mbbanking.mapper;

import com.mbbanking.dto.response.TransactionResponse;
import com.mbbanking.entity.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    @Mapping(target = "sourceAccountId", source = "sourceAccount.id")
    @Mapping(target = "destinationAccountId", source = "destinationAccount.id")
    TransactionResponse toResponse(Transaction entity);
}
