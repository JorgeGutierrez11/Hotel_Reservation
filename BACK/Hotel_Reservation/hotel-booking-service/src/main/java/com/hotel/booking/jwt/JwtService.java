package com.hotel.booking.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    //Quien genera el token, en este caso es el backend
    @Value("${jwt.generator}")
    private String generator;
    //Generamos una clave segura
    @Value("${jwt.secret_key}")
    private String SECRET_KEY;

    private Key getSecretKey() {
        byte[] encodedKey = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(encodedKey);
    }

    //Creación de métodos para extraer información del token

    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token) {
        return !isTokenExpired(token);
    }

    public Claims getAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(this.getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Este método permite obtener un *claim* específico del JWT de forma genérica.
     *
     * <p>
     *     Utiliza el tipo genérico {@code <R>} para poder devolver distintos tipos de datos
     *     (por ejemplo, {@code String}, {@code Date}, etc.) sin necesidad de crear un método
     *     diferente para cada tipo de claim.
     * </p>
     *
     * <p>
     *     El segundo parametro recibe una {@code Function<T, R>}
     *     donde {@code <T>} es el tipo de dato de entreada, que en este caso
     *     en de tipo {@code Claims} y {@code <R>} es el tipo de dato del claim que
     *     estamos buscando.
     * </p>
     * <h3>Ejemplo</h3>
     * <p>
     *     Si queremos buscar por ejemplo la fecha de expiración del Token, este nos tiene
     *     que devolver un objeto de tipo {@code Date} o si queremos buscar el username
     *     nos devuelve un objeto de tipo {@code String}.
     * </p>
     * <p>
     *     Para poder retornar cualquiera tipo
     *     de dato sin tener que crear un método que retorne un {@code String} o un {@code Date}
     *     se utiliza el genérico que está en el método.
     * </p>
     *
     * @param token El token JWT del cual se extraerá el claim.
     * @param claimsResolver Una función que indica qué claim queremos obtener.
     * @param <R> El tipo de dato del claim deseado (por ejemplo {@code String}, {@code Date}, etc.).
     * @return El valor del claim, del tipo {@code R}.
     */
    private <R> R getClaim(String token, Function<Claims, R> claimsResolver) {
        Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token) {
        return getClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        return getExpiration(token).before(new Date());
    }

}
