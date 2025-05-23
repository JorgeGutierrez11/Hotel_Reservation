package com.hotel.booking.controllers;

import com.hotel.booking.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/booking-code")
    public ResponseEntity<String> sendBookingCode(@RequestBody String email) {
        return ResponseEntity.ok(emailService.sendBookingCode(email));
    }

}
