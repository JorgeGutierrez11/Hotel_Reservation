package com.hotel.booking.config;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        String message = "Error en el formato del JSON: " + getDetailedMessage(ex);
        return ResponseEntity.badRequest().body(Map.of(
                "error", "BadRequest",
                "message", message
        ));
    }

    private String getDetailedMessage(HttpMessageNotReadableException ex) {
        Throwable mostSpecificCause = ex.getMostSpecificCause();
        return mostSpecificCause.getMessage();
    }
}
