package com.hotel.booking.model.dto.response;

import com.hotel.booking.model.enums.RoomType;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
@Getter
public class CheckResponse {

    private String bookingCode;
    private String name;
    private String email;
    private String phone;
    private String numberDocument;
    private String roomNumber;
    private RoomType roomType;
    private Long days;
    private BigDecimal totalCost;
    private LocalDateTime checkOutDate;
    private LocalDateTime checkInDate;

}
