package com.hotel.booking.models.dtos.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class LoginRequest {

    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String password;

}
