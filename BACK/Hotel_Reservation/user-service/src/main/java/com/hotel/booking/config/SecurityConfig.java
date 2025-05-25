package com.hotel.booking.config;

import com.hotel.booking.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
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

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> {
                    //Definir rutas públicas como Login y Register
                    request.requestMatchers("/auth/**").permitAll();

                    //Servicio de Email, envio de código de reversación
                    request.requestMatchers("/api/email/booking-code").permitAll();

                    //Solo puede hacer estas peticiones un ADMIN
                    request.requestMatchers("/users/getAll", "/users/user/**",
                                    "/users/create", "/users/delete/**")
                            .hasRole("ADMIN");

                    //Puede acceder cualquiera de los 3 roles
                    request.requestMatchers("/users/getUser/info")
                            .hasAnyRole("USER", "ADMIN", "RECEPTIONIST");

                    //Solo personal del hotel
                    request.requestMatchers("/users/by-ids").hasAnyRole("RECEPTIONIST", "ADMIN");

                    //Para las demás rutas se requiere atenticaión
                    request.anyRequest().authenticated();
                })
                .sessionManagement(session -> {
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
