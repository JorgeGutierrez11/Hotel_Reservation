package com.hotel.booking.controller;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.exception.RoomUnavailableException;
import com.hotel.booking.model.dto.ReservationDTO;
import com.hotel.booking.model.entity.Reservation;
import com.hotel.booking.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Reservation>> findAll() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/getByStatusNot")
    public  ResponseEntity<List<Reservation>> findByStatusNot() {
        return ResponseEntity.ok(reservationService.findByStatusNot());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservationService.findById(id));
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            reservationService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation reservation = reservationService.create(reservationDTO);
            return ResponseEntity.created(new URI("/reservation/create/" + reservation.getId())).build();
        } catch (RoomUnavailableException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        } catch (IllegalArgumentException err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.getMessage());
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Valid @RequestBody ReservationDTO reservationDTO) {
        try {
            return ResponseEntity.ok(reservationService.update(id, reservationDTO));
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        } catch (IllegalArgumentException err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err.getMessage());
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }

    /*@PreAuthorize("hasRole('RECEPTIONIST')")*/
    @PostMapping("/check-in/{id}")
    public ResponseEntity<Void> checkIn(@PathVariable Long id) {
        reservationService.checkIn(id);
        return ResponseEntity.ok().build();
    }

    /*@PreAuthorize("hasRole('RECEPTIONIST')")*/
    @PostMapping("/check-out/{id}")
    public ResponseEntity<Void> checkOut(@PathVariable Long id) {
        reservationService.checkOut(id);
        return ResponseEntity.ok().build();
    }


}
