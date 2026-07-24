package com.mbbanking.mapper;

import com.mbbanking.dto.response.LoanResponse;
import com.mbbanking.entity.Loan;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoanMapper {
    LoanResponse toResponse(Loan entity);
}
