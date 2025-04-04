package com.hotel.booking.models.entities;

import com.hotel.booking.models.enums.Role;
import com.hotel.booking.models.enums.TypeDocument;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users",
        uniqueConstraints = {@UniqueConstraint(
                columnNames = {"email", "phoneNumber", "numberDocument"}
        )})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String lastname;
    @Column(nullable = false)
    private String email;
    @Enumerated(EnumType.STRING)
    private TypeDocument typeDocument;
    @Column(length = 12, nullable = false)
    private String numberDocument;
    private String phoneNumber;
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

}
