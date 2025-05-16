import { useEffect, useMemo, useState } from "react";
import Person from "../assets/person.svg";
import Logo from "../assets/Hotel Logo.svg";
import RoomDetailsComponent from "../components/RoomDetails/RoomDetailsComponent";
import { Reservation } from "./Reservation";
import { getRoomForId } from "../api/services/rooms.service";
import { Room } from "../models/rooms.model";
import { useApi } from "../api/hooks/useApi";
import { useParams } from "react-router";
import "./RoomDetails.css";

function RoomDetials() {
  const { id } = useParams<{ id: string }>();
  const roomId = Number(id);
  const [activeTab, setActiveTab] = useState<boolean>(true);

  const apiCall = useMemo(() => getRoomForId(roomId), []);
  const { data: room, error, loading, fetch } = useApi<Room>(apiCall);
  useEffect(() => fetch(), [])

  if (loading) return <p>Cargando habitación...</p>;
  if (error) return <p>Error al cargar la habitación.</p>;
  if (!room) return <p>No se encontró la habitación</p>;

  const roomInfo = {
    title: room.roomType,
    capacity: room.capacity,
    status: room.roomStatus,
  };

  const capacity =
    roomInfo.capacity === 1
      ? `Solamente ${roomInfo.capacity} persona`
      : `Hasta ${roomInfo.capacity} personas`;

  const roomDetails = {
    description: room.description,
    politicas: {
      items: [
        "Check-in: 15:00 - 22:00",
        "Check-out: hasta las 11:00",
        "Cancelación gratuita hasta 48 horas antes",
        "No se permiten mascotas",
        "Prohibido fumar",
      ],
    },
    comodidades: [
          { icon: "🛏️", text: "Cama King Size" },
          { icon: "🌆", text: "Vista panorámica" },
          { icon: "🚿", text: "Ducha efecto lluvia" },
          { icon: "☕", text: "Cafetera premium" },
          { icon: "💼", text: "Zona de trabajo ergonómica" },
          { icon: "📺", text: "TV Smart" },
        ],

    /* comodidades: room.amenity, */
    image: 'https://cdn.pixabay.com/photo/2016/10/18/09/02/hotel-1749602_1280.jpg'
  };

  return (
    <div className="room-details" style={{ paddingTop: "100px" }}>
      <div className="header-details">
        <div className="title">
          <h1>{roomInfo.title}</h1>
          <span className={roomInfo.status}>{roomInfo.status}</span>
          <div className="capacity">
            <img src={Person} alt="User icon" />
            <p>{capacity}</p>
          </div>
        </div>
        <div className="logo">
          <img src={Logo} alt="Hotel logo" />
        </div>
      </div>

      <div className="slider-actions">
        <div className="slider-container">
          <button
            className={`slider ${activeTab === true ? "active" : ""}`}
            onClick={() => setActiveTab(true)}
          >
            Detalles
          </button>
          <button
            className={`slider ${activeTab === false ? "active" : ""}`}
            onClick={() => setActiveTab(false)}
          >
            Comentarios
          </button>

        </div>
      </div>
      <div className="animated-section">
        <h1>{activeTab ? "Detalles de la habitación" : "Reserva tu habitación"}</h1>
      </div>

      {activeTab && <RoomDetailsComponent roomDetails={roomDetails} />}
      {!activeTab && (
        <div className="reserva-contenido">
          <Reservation />
        </div>
      )}
    </div>
  );
}

export default RoomDetials;
