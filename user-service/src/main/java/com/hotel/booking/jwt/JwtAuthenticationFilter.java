package com.hotel.booking.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * <h1>Filtro personalizado</h1>
 * <p>
 *     Este filtro nos va a ayudar para interceptar la peticón que se haga
 *     y revisar el token que trae en el header, para así verificar si es
 *     o no válido para continuar. Si el token no es válido o tiene alguna
 *     modificación, seguimos con la cadena de filtro y Spring se encargará de
 *     enviar la excepción.
 * </p>
 * <h2>Anotación @Component</h2>
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        filterChain.doFilter(request, response);

    }
}
