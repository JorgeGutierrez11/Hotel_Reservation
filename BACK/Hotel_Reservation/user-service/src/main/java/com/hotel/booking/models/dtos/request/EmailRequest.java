package com.hotel.booking.models.dtos.request;

import java.io.Serializable;

public record EmailRequest(
        String to,
        String subject,
        String code
) implements Serializable {
}
