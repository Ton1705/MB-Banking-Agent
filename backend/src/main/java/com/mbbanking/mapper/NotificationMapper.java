package com.mbbanking.mapper;

import com.mbbanking.dto.response.NotificationResponse;
import com.mbbanking.entity.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse toResponse(Notification entity);
}
