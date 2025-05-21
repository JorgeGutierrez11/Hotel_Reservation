package com.hotel.booking.service;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.RoomAmenityDTO;
import com.hotel.booking.model.entity.RoomAmenity;
import com.hotel.booking.repository.RoomAmenityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomAmenityService {
    private final RoomAmenityRepository amenityRepository;

    public RoomAmenityService(RoomAmenityRepository amenityRepository) {
        this.amenityRepository = amenityRepository;
    }

    public List<RoomAmenity> findAll() {
        return amenityRepository.findAll();
    }

    public RoomAmenity findById(Long id) {
        return amenityRepository.findById(id)
                .orElseThrow(() -> new NoSuchDataException("No se a encontrado el servicio"));
    }

    public void delete(Long id) {
        amenityRepository.deleteById(id);
    }

    public RoomAmenity create(RoomAmenityDTO roomAmenityDTO) {
        RoomAmenity amenity = RoomAmenity.builder()
                .name(roomAmenityDTO.getName())
                .build();
        amenityRepository.save(amenity);
        return amenity;
    }

    public RoomAmenity update(Long id, RoomAmenityDTO roomAmenityDTO) {
        RoomAmenity amenity = findById(id);
        amenity.setName(roomAmenityDTO.getName());

        amenityRepository.save(amenity);
        return amenity;
    }
}