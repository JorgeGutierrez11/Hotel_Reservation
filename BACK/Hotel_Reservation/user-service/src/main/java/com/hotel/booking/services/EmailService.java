package com.hotel.booking.services;

import com.hotel.booking.models.dtos.request.EmailRequest;
import com.hotel.booking.models.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class EmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);

    public String sendBookingCode(String email) {

        String url = "http://localhost:3000/send-email";
        String to = email;
        String subject = "Código de verificación | Check-in";
        String code = UUID.randomUUID().toString().substring(30).toUpperCase();

        System.out.println("Código generado: " + code);

        EmailRequest emailRequest = new EmailRequest(to, subject, code);

        HttpEntity<EmailRequest> request = new HttpEntity<>(emailRequest);

        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            LOGGER.info("Email sent: {}", response.getBody());
        } catch (Exception e) {
            LOGGER.error("Email sent error: {}", e.getMessage());
        }
        return code;
    }


}
