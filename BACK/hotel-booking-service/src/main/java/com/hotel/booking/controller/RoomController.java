package com.hotel.booking.controller;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.RoomDTO;
import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.enums.RoomType;
import com.hotel.booking.service.RoomService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    /* Filters */
    /* Ejemplo de uso: GET /room/filter?type=STANDARD&minCapacity=2&amenityIds=1,2,5 */

    @GetMapping("/filter")
    public ResponseEntity<List<Room>> filterRooms(
            @RequestParam(required = false) RoomType type,
            @RequestParam(required = false) Integer capacity,
            @RequestParam(required = false) List<Long> amenityIds
    ) {
        List<Room> rooms = roomService.filterRooms(type, capacity, amenityIds);
        return ResponseEntity.ok(rooms);
    }

    /* CRUD */

    @GetMapping("/getAll")
    public ResponseEntity<List<Room>> findAll() {
        return ResponseEntity.ok(roomService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(roomService.findBiId(id));
        } catch (NoSuchDataException err) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roomService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody RoomDTO roomDTO) {
        try {
            Room room = roomService.create(roomDTO);
            return ResponseEntity.created(new URI("/room/create/" + room.getId())).build();
        } catch (IllegalArgumentException err) {
            return ResponseEntity.badRequest().body("Datos invalidos:" + err.getMessage());
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @Valid @RequestBody RoomDTO roomDTO) {
        return ResponseEntity.ok(roomService.update(id, roomDTO));
    }
}
