package com.hotel.booking.services;

import com.hotel.booking.exceptions.UserNotFoundException;
import com.hotel.booking.jwt.JwtService;
import com.hotel.booking.models.dtos.request.LoginRequest;
import com.hotel.booking.models.dtos.request.UserRequest;
import com.hotel.booking.models.dtos.response.AuthResponse;
import com.hotel.booking.models.entities.User;
import com.hotel.booking.models.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final JwtService jwtService;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        User user = userService.findUserByEmail(loginRequest.getEmail());
        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(UserRequest userRequest) {

        User user = User.builder()
                .name(userRequest.getName())
                .lastname(userRequest.getLastname())
                .email(userRequest.getEmail())
                .typeDocument(userRequest.getTypeDocument())
                .numberDocument(userRequest.getNumberDocument())
                .phoneNumber(userRequest.getPhoneNumber())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.USER)
                .build();

        userService.save(user);

        return AuthResponse.builder()
                .token(jwtService.generateToken(user))
                .build();
    }

}
