package com.hotel.booking.controller;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.ReservationDTO;
import com.hotel.booking.model.dto.response.CheckResponse;
import com.hotel.booking.model.entity.Reservation;
import com.hotel.booking.model.enums.ReservationStatus;
import com.hotel.booking.service.ReservationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;
    private static final Logger LOGGER = LoggerFactory.getLogger(ReservationController.class);

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Reservation>> findAll() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @GetMapping("/getByStatusNot")
    public ResponseEntity<List<Reservation>> findByStatusNot() {
        return ResponseEntity.ok(reservationService.findByStatusNot());
    }

    @GetMapping("/filter/{roomId}")
    public ResponseEntity<List<Reservation>> filterByStatus(@PathVariable Long roomId) {
        return ResponseEntity.ok(reservationService.filterReservationsByRoom(roomId));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> finById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(reservationService.findById(id));
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }
    }

    @GetMapping("/reservations")
    public ResponseEntity<List<Reservation>> findReservationsByUser() {
        try {
            return ResponseEntity.ok(reservationService.findReservationsByUser());
        } catch (NoSuchDataException err) {
            LOGGER.warn(err.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception err) {
            LOGGER.error(err.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            reservationService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }  catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err.getMessage());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation reservation = reservationService.create(reservationDTO);
            return ResponseEntity.created(new URI("/reservation/create/" + reservation.getId())).build();
        } catch (IllegalArgumentException err) {
            return ResponseEntity.badRequest().body("Datos invalidos:" + err.getMessage());
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
    @PostMapping("/check-in")
    public ResponseEntity<CheckResponse> checkIn(@RequestBody String bookingCode,
                                                 @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(reservationService.checkIn(bookingCode, authHeader));
    }

    /*@PreAuthorize("hasRole('RECEPTIONIST')")*/
    @PostMapping("/check-out")
    public ResponseEntity<CheckResponse> checkOut(@RequestBody String bookingCode,
                                                  @RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(reservationService.checkOut(bookingCode, authHeader));
    }

    @GetMapping("/check-out")
    public ResponseEntity<List<CheckResponse>> getAllCheckOuts(
            @RequestHeader("Authorization") String authHeader) {

        try {
            return ResponseEntity.ok(reservationService.getUsersForChecks(authHeader, ReservationStatus.CHECKED_IN));
        } catch (NoSuchDataException err) {
            LOGGER.warn(err.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception err) {
            LOGGER.error(err.getMessage());
            return ResponseEntity.internalServerError().build();
        }

    }

}
