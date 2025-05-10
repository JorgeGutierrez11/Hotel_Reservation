package com.hotel.booking.model.dto;

import com.hotel.booking.model.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseDTO {
    private List<Room> rooms;
    private FilterOptionsDTO filters;
}
