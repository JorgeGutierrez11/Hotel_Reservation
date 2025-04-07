package com.hotel.booking.model.dto;

import com.hotel.booking.model.enums.RoomStatus;
import com.hotel.booking.model.enums.RoomType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDTO {

    @NotBlank
    @Size(max = 10)
    private String roomNumber;

    @NotNull
    private RoomType roomType;

    @NotNull
    @Min(value = 1, message = "La capacidad mínima es 1")
    private Integer capacity;

    @NotNull
    @Digits(integer = 10, fraction = 2)
    @Positive(message = "El precio debe ser mayor a 0")
    private BigDecimal pricePerNight;

    @NotNull
    @Digits(integer = 1, fraction = 3)
    private BigDecimal taxRate;

    @NotNull
    private RoomStatus roomStatus;

    @NotNull
    private List<Long> amenityIds;

    @NotBlank
    @Size(max = 255)
    private String description;

    @NotBlank
    @Size(max = 255)
    private String policies;
}
