package com.hotel.booking.config;

import com.hotel.booking.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> {
                    //Definir rutas publicas
                    //Habitaciones
                    request.requestMatchers(HttpMethod.GET, "/room/filter", "/room/getAll")
                            .permitAll();

                    //Comodidades - publicas
                    request.requestMatchers(HttpMethod.GET, "/amenity/getAll", "/amenity/{id}")
                            .permitAll();

                    //Reservas -> se requiere autenticacion
                    request.requestMatchers("/reservation/reservations", "/reservation/create",
                                    "/reservation/get/{id}/", "/reservation/update/{id}")
                            .hasRole("USER");

                    request.requestMatchers("/reservation/check-in", "/reservation/check-out")
                            .hasAnyRole("RECEPTIONIST", "ADMIN");

                    request.requestMatchers(HttpMethod.GET, "/reservation/getAll")
                            .permitAll();
                    /*.hasRole("ADMIN");*/

                    request.anyRequest().hasRole("ADMIN");
                })
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
