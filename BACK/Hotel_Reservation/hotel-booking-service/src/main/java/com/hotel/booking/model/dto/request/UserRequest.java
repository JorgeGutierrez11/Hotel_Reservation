package com.hotel.booking.model.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRequest {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String typeDocument;
    private String numberDocument;
    private String phoneNumber;
    private String password;
    private String role;
}
