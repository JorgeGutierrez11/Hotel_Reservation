package com.hotel.booking.service;

import com.hotel.booking.model.dto.request.UserRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserClient {

    private static final String USER_SERVICE_URL = "http://localhost:8080/users/by-ids";
    private static final Logger LOGGER = LoggerFactory.getLogger(UserClient.class);

    private final RestTemplate restTemplate;

    /**
     * <p>
     *     Realiza la petición el servicio {@code user-service} para obtener
     *     una lista de usuarios con sus datos. Se le envía el token en los headers
     *     para poder obtener acceso al endpoint.
     * </p>
     * @param ids Lista de ids de usuarios que están actualmente en el hotel,
     *            (usuarios que ya hicieron Check-in)
     * @param authHeader El encabezado donde viene el token del request que hace el Frontend
     * @return Una {@code List<UserRequest>} con información de cada usuario.
     */
    public List<UserRequest> findAllUsersByIds(List<Long> ids, String authHeader) {


        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add("Authorization", authHeader);

        HttpEntity<List<Long>> request = new HttpEntity<List<Long>>(ids, headers);

        ResponseEntity<UserRequest[]> response = restTemplate.exchange(
                USER_SERVICE_URL,
                HttpMethod.POST,
                request,
                UserRequest[].class
        );

        LOGGER.info("Request successfully");
        LOGGER.info("Response from UserService: {}", response.getBody());

        return response.getBody() == null ? new ArrayList<>()
                : Arrays.asList(response.getBody());
    }

}
