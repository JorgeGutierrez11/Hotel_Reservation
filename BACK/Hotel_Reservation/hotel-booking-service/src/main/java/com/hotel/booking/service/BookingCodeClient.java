package com.hotel.booking.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BookingCodeClient {

    private static final String BOOKING_CODE_URL = "http://localhost:8080/api/email/booking-code";
    private static final Logger LOGGER = LoggerFactory.getLogger(BookingCodeClient.class);

    private final RestTemplate restTemplate;

    /**
     * <p>
     *     Hace el llamado al endpoint de {@code user-service} que crea el código
     *     de reservación y la envía el correo especificado
     * </p>
     * @param email Email del usuario que realiza la reserva.
     * @return Un código de reserva alfanumérico de 6 caracteres.
     */
    public String sendBookingCode(String email) {
        Map<String, String> body = new HashMap<>();
        body.put("email", email);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body);

        ResponseEntity<String> code = restTemplate.postForEntity(
                BOOKING_CODE_URL,
                request,
                String.class
        );

        LOGGER.info("Booking code generated: {}", code.getBody());
        return code.getBody();
    }

}
