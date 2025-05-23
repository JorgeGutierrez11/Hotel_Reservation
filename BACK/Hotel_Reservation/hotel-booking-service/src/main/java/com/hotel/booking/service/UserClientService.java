package com.hotel.booking.service;

import com.hotel.booking.model.dto.request.UserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserClientService {

    private final RestTemplate restTemplate;
    private static final String BASE_URL = "http://localhost:8080/users/by-ids";

    public List<UserRequest> findAllUsersByIds(List<Long> ids) {
        HttpEntity<List<Long>> request = new HttpEntity<>(ids);

        ResponseEntity<UserRequest[]> response = restTemplate.exchange(
                BASE_URL,
                HttpMethod.POST,
                request,
                UserRequest[].class
        );

        System.out.println(Arrays.toString(response.getBody()));

        return response.getBody() == null ? new ArrayList<>()
                : Arrays.asList(response.getBody());
    }

}
