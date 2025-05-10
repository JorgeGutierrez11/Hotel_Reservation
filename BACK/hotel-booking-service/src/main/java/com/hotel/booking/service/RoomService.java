package com.hotel.booking.service;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.RoomDTO;
import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.entity.RoomAmenity;
import com.hotel.booking.model.enums.RoomStatus;
import com.hotel.booking.model.enums.RoomType;
import com.hotel.booking.repository.RoomAmenityRepository;
import com.hotel.booking.repository.RoomRepository;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomAmenityRepository amenityRepository;

    public RoomService(RoomRepository roomRepository, RoomAmenityRepository amenityRepository) {
        this.roomRepository = roomRepository;
        this.amenityRepository = amenityRepository;
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
        List<RoomAmenity> amenities = amenityRepository.findAllById(roomDTO.getAmenityIds());

        Room room = Room.builder()
                .roomNumber(roomDTO.getRoomNumber())
                .roomType(roomDTO.getRoomType())
                .capacity(roomDTO.getCapacity())
                .pricePerNight(roomDTO.getPricePerNight())
                .taxRate(roomDTO.getTaxRate())
                .roomStatus(roomDTO.getRoomStatus())
                .amenity(amenities)
                .description(roomDTO.getDescription())
                .policies(roomDTO.getPolicies())
                .build();
        roomRepository.save(room);
        return room;
    }

    public Room update(Long id, RoomDTO roomDTO) {
        Room room = findBiId(id);
        List<RoomAmenity> amenities = amenityRepository.findAllById(roomDTO.getAmenityIds());

        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setRoomType(roomDTO.getRoomType());
        room.setCapacity(roomDTO.getCapacity());
        room.setPricePerNight(roomDTO.getPricePerNight());
        room.setRoomStatus(roomDTO.getRoomStatus());
        room.setAmenity(amenities);
        room.setDescription(roomDTO.getDescription());
        room.setPolicies(roomDTO.getPolicies());

        roomRepository.save(room);
        return room;
    }

    /* Filters */

    public List<Room> filterRooms(RoomType type, Integer capacity, List<Long> amenityIds) {
        return roomRepository.findAll(((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (type != null) {
                predicates.add(criteriaBuilder.equal(root.get("roomType"), type));
            }
            if (capacity != null) {
                predicates.add(criteriaBuilder.equal(root.get("capacity"), capacity));
            }
            if (amenityIds != null && !amenityIds.isEmpty()) {
                Join<Object, Object> amenityJoin = root.join("amenity");
                predicates.add(amenityJoin.get("id").in(amenityIds));
                query.distinct(true);
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        }));
    }

    public List<Integer> getAllCapacities() {
        return roomRepository.findDistinctCapacities();
    }

    public List<RoomType> getAllTypes() {
        return roomRepository.findDistinctTypes();
    }

    public List<String> getAllAmenityNames() {
        return amenityRepository.findAllAmenityName();
    }
}
