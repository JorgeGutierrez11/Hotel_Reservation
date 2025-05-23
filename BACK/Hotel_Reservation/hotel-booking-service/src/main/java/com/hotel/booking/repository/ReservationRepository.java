package com.hotel.booking.repository;

import com.hotel.booking.model.entity.Reservation;
import com.hotel.booking.model.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId AND " +
            "r.startDate < :endDate AND r.endDate > :startDate")
    List<Reservation> findReservationsByDates(@Param("roomId") Long roomId,
                                              @Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);

    @Query("SELECT r FROM Reservation r WHERE r.customerId = :userId")
    List<Reservation> findReservationsByUser(@Param("userId") Long userId);

    @Query("SELECT r FROM Reservation r WHERE r.reservationStatus = :status")
    List<Reservation> findByStatus(@Param("status") ReservationStatus status);

    @Query("SELECT r FROM Reservation r WHERE r.reservationStatus != :status")
    List<Reservation> findByStatusNot(ReservationStatus status);

    @Query("SELECT r FROM Reservation r WHERE r.bookingCode = :bookingCode")
    Optional<Reservation> findByBookingCode(String bookingCode);
}
