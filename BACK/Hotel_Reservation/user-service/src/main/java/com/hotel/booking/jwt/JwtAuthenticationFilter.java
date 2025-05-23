package com.hotel.booking.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
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
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = this.getTokenFromRequest(request);

        if(token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String username = jwtService.getUsernameFromToken(token);

        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if(jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authUser =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );

                //No entiendo muy bien por qué se agrega esto jeje
                authUser.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authUser);
                System.out.println(SecurityContextHolder.getContext().getAuthentication());
            }

        }

        filterChain.doFilter(request, response);
    }

    /**
     * <p>
     *     Verificamos si existen la sección de AUTHORIZATION
     *     en el encabezado de la petición y debemos mirar que empiece con la palabra Bearer
     * </p>
     *
     * <b>Ejemplo de un Header de HTTP</b>
     *<blockquote><pre>
     * GET /api/productos HTTP/1.1
     * Host: api.tu-ecommerce.com
     * Authorization: Bearer eyJhbGciOiJIUzI.1NiIsInR5cCI6IkpXVCJ9.eyJz
     * Content-Type: application/json
     *</blockquote></pre>
     * @param request El request de la petición
     * @return El token si existen, de lo contrario retorna {@code null}
     */
    private String getTokenFromRequest(HttpServletRequest request) {
        String headerAuthorization = request.getHeader(HttpHeaders.AUTHORIZATION);

        //Verficamos que no sea nulo y que empiece con Bearer
        if(StringUtils.hasText(headerAuthorization) && headerAuthorization.startsWith("Bearer ")) {
            String token = headerAuthorization.substring(7);
            return token;
        }
        return null;
    }
}
