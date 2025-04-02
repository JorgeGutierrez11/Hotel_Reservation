package com.hotel.booking.service;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.RoomDTO;
import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.enums.RoomStatus;
import com.hotel.booking.model.enums.RoomType;
import com.hotel.booking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    public Room findBiId(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchDataException("No se encontro la habitación"));
    }

    public void delete(Long id) {
        roomRepository.deleteById(id);
    }

    public Room create(RoomDTO roomDTO) {
        Room room = Room.builder()
                .roomNumber(roomDTO.getRoomNumber())
                .roomType(RoomType.values()[roomDTO.getRoomType()])
                .capacity(roomDTO.getCapacity())
                .pricePerNight(roomDTO.getPricePerNight())
                .roomStatus(RoomStatus.values()[roomDTO.getRoomStatus()])
                .description(roomDTO.getDescription())
                .policies(roomDTO.getPolicies())
                .build();
        roomRepository.save(room);
        return room;
    }

    public Room update(Long id, RoomDTO roomDTO) {
        Room room = findBiId(id);

        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(RoomType.values()[roomDTO.getRoomType()]);
        room.setCapacity(roomDTO.getCapacity());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setRoomStatus(RoomStatus.values()[roomDTO.getRoomType()]);
        room.setDescription(roomDTO.getDescription());
        room.setPolicies(roomDTO.getPolicies());

        roomRepository.save(room);
        return room;
    }
}
