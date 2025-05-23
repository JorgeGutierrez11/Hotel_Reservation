package com.hotel.booking.service;

import com.hotel.booking.exception.NoSuchDataException;
import com.hotel.booking.exception.RoomUnavailableException;
import com.hotel.booking.model.dto.ReservationDTO;
import com.hotel.booking.model.dto.request.UserRequest;
import com.hotel.booking.model.dto.response.CheckResponse;
import com.hotel.booking.model.entity.Reservation;
import com.hotel.booking.model.entity.Room;
import com.hotel.booking.model.enums.ReservationStatus;
import com.hotel.booking.model.enums.RoomStatus;
import com.hotel.booking.repository.ReservationRepository;
import com.hotel.booking.repository.RoomRepository;
import io.jsonwebtoken.Claims;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomRepository roomRepository;
    private final CheckService checkService;

    private final RestTemplate restTemplate;

    private static final Logger log = LoggerFactory.getLogger(ReservationService.class);

    public ReservationService(ReservationRepository reservationRepository,
                              RoomRepository roomRepository,
                              RestTemplate restTemplate,
                              CheckService checkService) {
        this.reservationRepository = reservationRepository;
        this.roomRepository = roomRepository;
        this.restTemplate = restTemplate;
        this.checkService = checkService;
    }

    /* Validaciones y Logica de calcfindReservationsByUserulo */

    private LocalDateTime validationDate(ReservationDTO reservationDTO) {
        if (!reservationDTO.getStartDate().isBefore(reservationDTO.getEndDate())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser igual o posterior a la fecha de fin.");
        }
        return reservationDTO.getEndDate();
    }

    private boolean isRoomAvailable(Long roomId, LocalDateTime startDate, LocalDateTime endDate) {
        Room room = findRoomById(roomId);
        if (room.getRoomStatus() == RoomStatus.OCCUPIED || room.getRoomStatus() == RoomStatus.MAINTENANCE) {
            return false;
        }

        List<Reservation> reservations = reservationRepository.findReservationsByDates(roomId, startDate, endDate);
        log.info("Lista de reservas en estas fechas: {}", reservations);
        return reservations.isEmpty();
    }

    private long calculateDays(LocalDateTime start, LocalDateTime end) {
        long hours = ChronoUnit.HOURS.between(start, end);
        long days = (long) Math.ceil(hours / 24.0);
        log.info("Calculando días: {} horas entre {} y {}, resultado = {} días", hours, start, end, days);
        return days;
    }

    private BigDecimal calculateTotalCost(BigDecimal pricePerNight, long days, BigDecimal taxRate) {
        BigDecimal baseCost = pricePerNight.multiply(BigDecimal.valueOf(days));
        BigDecimal taxesAmount = baseCost.multiply(taxRate).setScale(2, RoundingMode.HALF_UP);
        return baseCost.add(taxesAmount);
    }

    /* Logica de negocio */

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public List<Reservation> findByStatus(ReservationStatus status) {
        return reservationRepository.findByStatus(status);
    }

    public List<Reservation> findByStatusNot() {
        return reservationRepository.findByStatusNot(ReservationStatus.CANCELED);
    }

    /**
     * <p>
     *     Trae de base de datos, todas las reservas realizadas para 1 habitación
     *     en específico, ignorando las que están canceladas.
     * </p>
     * @param roomId Habitación a la que se le quieren ver las reservas que tiene asociadas
     * @return Una {@code List<Reservation>} que contiene las reservaciones que ya están
     * echas para esa habitacion
     */
    public List<Reservation> filterReservationsByRoom(Long roomId) {
        return this.findByStatusNot().stream()
                .filter(r -> r.getRoom().getId().equals(roomId))
                .collect(Collectors.toList());
    }

    public List<Reservation> findReservationsByUser() {
        return reservationRepository.findReservationsByUser(getUserIdFromClaims());
    }

    public Reservation findById(long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new NoSuchDataException("Reservación no encontrada"));
    }

    public Reservation findByBookingCode(String bookingCode) {
        return reservationRepository.findByBookingCode(bookingCode)
                .orElseThrow(() -> new NoSuchDataException("Reservación no encontrada"));
    }

    public Room findRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchDataException("Habitación no encontrada"));
    }

    public void delete(Long id) {
        Reservation reservation = findById(id);
        reservationRepository.delete(reservation);
    }

    public Reservation create(ReservationDTO reservationDTO) {
        boolean isAvailable = isRoomAvailable(
                reservationDTO.getRoomId(),
                reservationDTO.getStartDate(),
                reservationDTO.getEndDate());

        log.info("isAvailable: {}", isAvailable);

        if (!isAvailable) {
            throw new RoomUnavailableException("La habitación no esta disponible");
        }

        Room room = findRoomById(reservationDTO.getRoomId());
        BigDecimal price = room.getPricePerNight();
        BigDecimal taxes = room.getTaxRate();

        long days = calculateDays(reservationDTO.getStartDate(), reservationDTO.getEndDate());
        BigDecimal totalPrice = calculateTotalCost(price, days, taxes);

        //Enviar Email
        String url = "http://localhost:8080/api/email/booking-code";
        Map<String, String> body = new HashMap<>();
        body.put("email", getEmailFromPrincipal());

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body);

        String bookingCode = restTemplate.postForEntity(url, request, String.class).getBody();

        Reservation reservation = Reservation.builder()
                .customerId(getUserIdFromClaims())
                .startDate(reservationDTO.getStartDate())
                .endDate(validationDate(reservationDTO))
                .reservationStatus(reservationDTO.getReservationStatus())
                .totalCost(totalPrice)
                .taxes(taxes)
                .room(room)
                .bookingCode(bookingCode)
                .build();

        reservationRepository.save(reservation);
        return reservation;
    }

    public Reservation update(Long id, ReservationDTO reservationDTO) {
        Reservation reservation = findById(id);

        Room room = findRoomById(reservationDTO.getRoomId());
        BigDecimal price = room.getPricePerNight();
        BigDecimal taxes = room.getTaxRate();

        long days = calculateDays(reservationDTO.getStartDate(), reservationDTO.getEndDate());
        BigDecimal totalPrice = calculateTotalCost(price, days, taxes);

        reservation.setCustomerId(getUserIdFromClaims());
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(validationDate(reservationDTO));
        reservation.setReservationStatus(reservationDTO.getReservationStatus());
        reservation.setTotalCost(totalPrice);
        reservation.setTaxes(taxes);
        reservation.setRoom(room);

        reservationRepository.save(reservation);
        return reservation;
    }

    public CheckResponse checkIn(String bookingCode) {
        Reservation reservation = findByBookingCode(bookingCode);
        Room room = reservation.getRoom();

        if (reservation.getCheckInDate() != null) {
            throw new IllegalStateException("Ya se realizó el check-in para esta reserva");
        }
        if (reservation.getReservationStatus() != ReservationStatus.CONFIRMED) {
            throw new IllegalStateException("Solo se puede hacer check-in para reservas confirmadas");
        }

        LocalDate today = LocalDate.now();
        LocalDate startDate = reservation.getStartDate().toLocalDate();
        if (today.isBefore(startDate)) {
            throw new IllegalStateException("No se puede hacer check-in antes de la fecha de inicio");
        }

        reservation.setCheckInDate(LocalDateTime.now());
        reservation.setReservationStatus(ReservationStatus.CHECKED_IN);
        room.setRoomStatus(RoomStatus.OCCUPIED);

        roomRepository.save(room);
        reservationRepository.save(reservation);

        return getCheck(bookingCode);
    }

    public CheckResponse checkOut(String bookingCode) {
        Reservation reservation = findByBookingCode(bookingCode);
        Room room = reservation.getRoom();

        if (reservation.getCheckInDate() == null) {
            throw new IllegalStateException("No es podible realizar el check-out si el check-in no se a realizado previamente");
        }
        if (reservation.getCheckOutDate() != null) {
            throw new IllegalStateException("Ya se realizó el check-out para esta reserva");
        }

        reservation.setCheckOutDate(LocalDateTime.now());
        reservation.setReservationStatus(ReservationStatus.COMPLETED);
        room.setRoomStatus(RoomStatus.AVAILABLE);

        roomRepository.save(room);
        reservationRepository.save(reservation);

        return getCheck(bookingCode);
    }

    /**
     * <p>
     *     Mostrar todos los usuarios que están en el hotel
     * </p>
     * @return Una lista {@code List<CheckResponse>} para el Recepcionista
     */
    public List<CheckResponse> getUsersForCheckOut() {
        List<Reservation> reservations = findByStatus(ReservationStatus.CONFIRMED);

        List<UserRequest> users = checkService.getUsersForCheckOut(reservations);

        List<CheckResponse> responses = new ArrayList<>();

        for (int i = 0; i < users.size(); i++) {

            UserRequest user = users.get(i);

            Reservation reservation = reservations.stream()
                    .filter(r -> r.getCustomerId().equals(user.getId()))
                    .findFirst()
                    .get();

            Room room = reservation.getRoom();

            CheckResponse check = CheckResponse.builder()
                    .bookingCode(reservation.getBookingCode())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhoneNumber())
                    .numberDocument(user.getNumberDocument())
                    .roomNumber(room.getRoomNumber())
                    .roomType(room.getRoomType())
                    .days(calculateDays(reservation.getStartDate(), reservation.getEndDate()))
                    .totalCost(reservation.getTotalCost())
                    .checkInDate(reservation.getCheckInDate())
                    .checkOutDate(reservation.getCheckOutDate())
                    .build();

            responses.add(check);
        }
        return responses;
    }

    private CheckResponse getCheck(String bookingCode) {
        return getUsersForCheckOut().stream()
                .filter(c -> c.getBookingCode().equals(bookingCode))
                .findFirst()
                .get();
    }

    private Long getUserIdFromClaims() {
        Map<String, Object> extraClaims = getExtraClaims();

        Number userId = (Number) extraClaims.get("id");
        return userId.longValue();
    }

    private String getEmailFromPrincipal() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
    }

    private Map<String, Object> getExtraClaims() {
        return (Claims)
                SecurityContextHolder.getContext().getAuthentication().getDetails();
    }

}
