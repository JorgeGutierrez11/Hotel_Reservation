package com.hotel.booking.repository;

import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.enums.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> , JpaSpecificationExecutor<Room> {
}
