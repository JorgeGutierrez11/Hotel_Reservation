package com.hotel.booking.model.dto;

import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.enums.ReservationStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {
    @NotNull
    private Long customerId;

    @NotNull
    @FutureOrPresent(message = "La fecha de inicio debe ser presente o futura")
    private LocalDateTime startDate;

    @Future(message = "La fecha debe ser futura")
    private LocalDateTime endDate;

    @NotNull
    private Integer reservationStatus;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @Positive(message = "El costo total debe ser mayo a 0")
    private BigDecimal totalCost;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @PositiveOrZero(message = "Los impuestos no pueden ser negativos")
    private BigDecimal taxes;

    @NotNull
    private Long roomId;
}
