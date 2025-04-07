package com.hotel.booking.controller;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.RoomAmenityDTO;
import com.hotel.booking.model.entity.RoomAmenity;
import com.hotel.booking.service.RoomAmenityService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/amenity")
public class RoomAmenityController {
    private final RoomAmenityService amenityService;

    public RoomAmenityController(RoomAmenityService amenityService) {
        this.amenityService = amenityService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<RoomAmenity>> findAll() {
        return ResponseEntity.ok(amenityService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(amenityService.findById(id));
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            amenityService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }  catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody RoomAmenityDTO amenityDTO) {
        try {
            RoomAmenity amenity = amenityService.create(amenityDTO);
            return ResponseEntity.created(new URI("/amenity/create/" + amenity.getId())).build();
        } catch (IllegalArgumentException err) {
            return ResponseEntity.badRequest().body("Datos invalidos:" + err.getMessage());
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Valid @RequestBody RoomAmenityDTO amenityDTO) {
        try {
            return ResponseEntity.ok(amenityService.update(id, amenityDTO));
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        } catch (IllegalArgumentException err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.getMessage());
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }
}
