package com.hotel.booking.service;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.model.dto.ReservationDTO;
import com.hotel.booking.model.entity.Reservation;
import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.enums.ReservationStatus;
import com.hotel.booking.repository.ReservationRepository;
import com.hotel.booking.repository.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;

    public ReservationService(ReservationRepository reservationRepository, RoomRepository roomRepository) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Reservation findById(long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchDataException("Reservación no encontrada"));
    }

    public Room findRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchDataException("Habitación no encontrada"));
    }

    public void delete(Long id){
        Reservation reservation = findById(id);
        reservationRepository.delete(reservation);
    }

    public Reservation create(ReservationDTO reservationDTO) {
        Room room = findRoomById(reservationDTO.getRoomId());

        Reservation reservation = Reservation.builder()
                .customerId(reservationDTO.getCustomerId())
                .startDate(reservationDTO.getStartDate())
                .endDate(reservationDTO.getEndDate())
                .reservationStatus(ReservationStatus.values()[reservationDTO.getReservationStatus()])
                .totalCost(reservationDTO.getTotalCost())
                .taxes(reservationDTO.getTaxes())
                .room(room)
                .build();

        reservationRepository.save(reservation);
        return reservation;
    }

    public Reservation update(Long id,ReservationDTO reservationDTO) {
        Room room = findRoomById(reservationDTO.getRoomId());
        Reservation  reservation = findById(id);

        reservation.setCustomerId(reservationDTO.getCustomerId());
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.setReservationStatus(ReservationStatus.values()[reservationDTO.getReservationStatus()]);
        reservation.setTotalCost(reservationDTO.getTotalCost());
        reservation.setTaxes(reservationDTO.getTaxes());
        reservation.setRoom(room);

        reservationRepository.save(reservation);
        return reservation;
    }
}
