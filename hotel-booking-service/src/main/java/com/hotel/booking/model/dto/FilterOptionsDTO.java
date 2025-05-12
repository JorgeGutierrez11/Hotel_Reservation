package com.hotel.booking.model.dto;

import com.hotel.booking.model.enums.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FilterOptionsDTO {
    private List<Integer> capacities;
    private List<RoomType> roomTypes;
    private List<String> amenities;
}
