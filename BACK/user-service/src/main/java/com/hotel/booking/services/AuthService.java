package com.hotel.booking.services;

import com.hotel.booking.exceptions.UserNotFoundException;
import com.hotel.booking.models.dtos.request.LoginRequest;
import com.hotel.booking.models.dtos.request.UserRequest;
import com.hotel.booking.models.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;

    public User login(LoginRequest loginRequest) {
        User user = userService.findUserByEmail(loginRequest.getEmail());

        if(!user.getPassword().equals(loginRequest.getPassword())) {
            throw new UserNotFoundException("User Not Found");
        }
        return user;
    }

    public User register(UserRequest userRequest) {
        return userService.save(userRequest);
    }

}
