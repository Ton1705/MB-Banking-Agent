package com.mbbanking.mapper;

import com.mbbanking.dto.response.SavingResponse;
import com.mbbanking.entity.Saving;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SavingMapper {
    SavingResponse toResponse(Saving entity);
}
