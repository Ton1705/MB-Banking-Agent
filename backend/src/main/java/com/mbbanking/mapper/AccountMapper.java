package com.mbbanking.mapper;

import com.mbbanking.dto.response.AccountResponse;
import com.mbbanking.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountResponse toResponse(Account entity);
}
