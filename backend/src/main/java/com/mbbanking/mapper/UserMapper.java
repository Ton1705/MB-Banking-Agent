package com.mbbanking.mapper;

import com.mbbanking.dto.response.UserResponse;
import com.mbbanking.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toResponse(User entity);
}
