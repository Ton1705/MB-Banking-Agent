package com.mbbanking.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String phoneNumber;
    private String avatarUrl;
    private String address;
    private LocalDate dateOfBirth;
    private String idNumber;
}
