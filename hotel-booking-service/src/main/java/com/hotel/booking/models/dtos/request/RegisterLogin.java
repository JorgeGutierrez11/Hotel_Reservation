package com.hotel.booking.models.dtos.request;


import com.hotel.booking.models.enums.TypeDocument;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterLogin {

    private String name;
    private String lastname;
    private String email;
    private TypeDocument typeDocument;
    private String numberDocument;
    private String phoneNumber;
    private String password;

}
