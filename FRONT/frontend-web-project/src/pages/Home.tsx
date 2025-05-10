import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useMemo, useState } from "react";
import { BarRoomFilter } from "../components/RoomFilter/RoomFilter";
import { emptyRoomFilterResponse, Room, RoomFilter, RoomFilterResponse } from "../models/rooms.model";
import { getFilterRooms } from "../api/services/rooms.service";
import { useApi } from "../api/hooks/useApi";
import { RoomCard } from "../components/RoomCard/RoomCard";
import { ServiceCard } from "../components/ServiceCard/ServiceCard";
import { BlinkBlur } from "react-loading-indicators";
import "./Home.css"

interface DataProps {
    rooms: Room[];
    filters: RoomFilter;
}

export const Home = () => {
    const services = [
        {
            "id": 1,
            "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
            "title": "Spa de Lujo con Terapias Holísticas"
        },
        {
            "id": 2,
            "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
            "title": "Chef Privado a Domicilio"
        },
        {
            "id": 3,
            "image": "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
            "title": "Suite con Piscina Infinita Privada"
        },
        {
            "id": 4,
            "image": "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
            "title": "Valet Parking con Autos Eléctricos"
        },
        {
            "id": 5,
            "image": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80",
            "title": "Restaurante Farm-to-Table"
        }
    ];

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true
    };

    const [filters, setFilters] = useState<RoomFilterResponse>(emptyRoomFilterResponse);
    console.log(`capacidad ${filters.capacitiesResponse} - comodidades ${filters.amenitiesResponse} - type ${filters.roomTypesResponse}`)

    const apiCall = useMemo(() => getFilterRooms(filters), [filters]);
    const { data, error, loading, fetch } = useApi<DataProps>(apiCall);
    /* console.log(data) */
    useEffect(() => fetch(), [fetch]);

    const rooms = data?.rooms;
    console.log(rooms)
    const capacityOptions: number[] = data?.filters.capacities ?? [];
    const roomTypeOptions: string[] = data?.filters.roomTypes ?? [];
    const amenityOptions: string[] = data?.filters.amenities ?? [];


    const filterData = (dataRequest: RoomFilterResponse) => {
        setFilters({ ...filters, capacitiesResponse: dataRequest.capacitiesResponse, amenitiesResponse: dataRequest.amenitiesResponse, roomTypesResponse: dataRequest.roomTypesResponse });
    }

    return (
        <div className="home">
            <header className="home-header">
                <div className="header-content">
                    <h1>Bienvenido a mi sitio</h1>
                    <p>Explora contenido interesante</p>
                </div>
            </header>
            <div className="body">
                <div className="filter-bar">
                    <BarRoomFilter
                        sendData={filterData}
                        capacityOptions={capacityOptions}
                        roomTypeOptions={roomTypeOptions}
                        amenityOptions={amenityOptions}
                    />
                </div>
                {loading || error ?
                    <div className="loading-cards">
                        <h1>Cargando habitaciones....</h1>
                        <BlinkBlur color={["#2b6b2b", "#1e4b7a", "#5d2b5d", "#8a4e1a"]} />
                    </div> :
                    <div className="room-cards">
                        <Slider {...settings}>
                            {rooms?.map((room) => (
                                <div key={room.id} className="slide-item">
                                    <RoomCard
                                        image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                                        roomType={room.roomType}
                                        description={room.description}
                                        pricePerNight={room.pricePerNight}
                                        capacity={room.capacity}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                }
                <div className="sevices-card">
                    <h1 className="services-principal-title">Servicios Principales</h1>
                    <div className="grid-container">
                        {services.map((service, index) => (
                            <ServiceCard key={index} image={service.image} title={service.title} id={service.id} />
                        ))}
                    </div>
                </div>
            </div>
            <footer className="footer-content">
                esto es el footer
            </footer>
        </div>
    )
}