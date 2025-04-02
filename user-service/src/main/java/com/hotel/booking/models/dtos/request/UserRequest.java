package com.hotel.booking.models.dtos.request;


import com.hotel.booking.models.enums.TypeDocument;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserRequest {

    @NotBlank
    private String name;
    @NotBlank
    private String lastname;
    @NotBlank
    @Email
    private String email;
    private TypeDocument typeDocument;
    @NotBlank
    @Size(min = 5, max = 10)
    private String numberDocument;
    @NotBlank
    @Size(min = 10, max = 10)
    private String phoneNumber;
    @NotBlank
    private String password;

}
