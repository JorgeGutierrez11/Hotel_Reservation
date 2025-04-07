package com.hotel.booking.repository;

import com.hotel.booking.model.entity.RoomAmenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomAmenityRepository extends JpaRepository<RoomAmenity, Long> {
    boolean existsByNameIgnoreCase(String name);
}
