package com.hotel.booking.service;

import com.hotel.booking.model.dto.request.UserRequest;
import com.hotel.booking.model.entity.Reservation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 *     Se crea con el fin de separa la lógica y desacoplar el código.
 *     También para implementar de forma sencilla el primer principio SOLID.
 *    <b>Single Responsibility Principle</b>
 * </p>
 */
@Service
public class CheckService {

    private final UserClient userClientService;

    public CheckService(UserClient userClientService) {
        this.userClientService = userClientService;
    }

    /**
     * <p>
     *     Obtener usuarios relacionados a las reservas que están activas (CONFIRMED)
     *     Para poder realizar el Checkout cuando sea necesario
     * </p>
     * @param reservations La lista de reservas que están activas y que están listas para hacer check-out
     * @return Una lista de {@code UserRequest} que son los usuarios que están actualmente en el hotel
     */
    public List<UserRequest> getUsersForCheckOut(List<Reservation> reservations, String authHeader) {

        List<Long> ids = reservations.stream()
                .map(Reservation::getCustomerId)
                .collect(Collectors.toList());

        return userClientService.findAllUsersByIds(ids, authHeader);
    }

}
