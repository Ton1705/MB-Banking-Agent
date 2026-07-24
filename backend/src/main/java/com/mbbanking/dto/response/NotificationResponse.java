package com.mbbanking.dto.response;

import com.mbbanking.enums.NotificationType;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationResponse {
    private Long id;
    private String title;
    private String message;
    private NotificationType type;
    private Boolean isRead;
    private String relatedEntityType;
    private Long relatedEntityId;
    private LocalDateTime createdAt;
}
