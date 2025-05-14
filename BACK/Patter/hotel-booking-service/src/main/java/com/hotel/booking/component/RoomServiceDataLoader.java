package com.hotel.booking.component;


import com.hotel.booking.model.entity.RoomAmenity;
import com.hotel.booking.repository.RoomAmenityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RoomServiceDataLoader implements CommandLineRunner {
    private final RoomAmenityRepository roomAmenityRepository;

    public RoomServiceDataLoader(RoomAmenityRepository roomAmenityRepository) {
        this.roomAmenityRepository = roomAmenityRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<String> services = List.of(
                "Baño privado", "Baño compartido", "Wifi gratuito",
                "Aire acondicionado", "Escritorio para trabajar", "Armario o ropero",
                "Toallas incluidas", "Desayuno incluido", "Servicio de limpieza", "Minibar",
                "Televisión", "Acceso a balcón", "Insonorización"
        );

        for (String name : services) {
            if(!roomAmenityRepository.existsByNameIgnoreCase(name)) {
                RoomAmenity amenity = RoomAmenity.builder()
                        .name(name)
                        .build();
                roomAmenityRepository.save(amenity);
            }
        }
    }
}
