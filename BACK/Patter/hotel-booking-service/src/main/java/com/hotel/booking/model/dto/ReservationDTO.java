package com.hotel.booking.model.dto;

import com.hotel.booking.model.enums.ReservationStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

//    @NotNull
//    private Long customerId;

    @NotNull
    @FutureOrPresent(message = "La fecha de inicio debe ser presente o futura")
    private LocalDateTime startDate;

    @Future(message = "La fecha debe ser futura")
    private LocalDateTime endDate;

    @NotNull
    private ReservationStatus reservationStatus;

    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;

    @NotNull
    private Long roomId;
}
