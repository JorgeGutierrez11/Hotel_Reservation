package com.hotel.booking.model.entity;

import com.hotel.booking.model.enums.RoomType;
import com.hotel.booking.model.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number",nullable = false, unique = true, length = 10)
    private String roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type",nullable = false)
    private RoomType roomType;

    @Column(nullable = false)
    private Integer capacity;

    @Column(name = "price_per_night",nullable = false)
    private BigDecimal pricePerNight;

    @Column(name = "tax_rate", nullable = false)
    private BigDecimal taxRate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomStatus roomStatus;

    @Column(length = 500)
    private String description;

    private List<String> policies;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @ManyToMany
    @JoinTable(
            name = "room_amenities_relation",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "amenity_id")
    )
    private List<RoomAmenity> amenity;
}
