import DataCard from "../components/ReservationCards/DataCard";
import BookingCard from "../components/ReservationCards/BookingCard";
import ProfileImage from "../assets/user-profile.svg";
import "./Profile.css";
import { useState } from "react";

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  reservationStatus:
    | "PENDING"
    | "CONFIRMED"
    | "CHECKED_IN"
    | "COMPLETED"
    | "CANCELED";
  totalCost: number;
  room: {
    id: number;
    roomNumber: string;
    roomType:
      | "SINGLE"
      | "STANDARD"
      | "SUITE"
      | "DELUXE"
      | "PENTHOUSE"
      | "FAMILY";
    capacity: number;
  };
}

function Profile() {
  const reservations: Reservation[] = [
    {
      id: 1,
      startDate: "2025-06-01",
      endDate: "2025-06-05",
      reservationStatus: "PENDING",
      totalCost: 500.0,
      room: {
        id: 101,
        roomNumber: "101A",
        roomType: "STANDARD",
        capacity: 2,
      },
    },
    {
      id: 2,
      startDate: "2025-06-10",
      endDate: "2025-06-15",
      reservationStatus: "CONFIRMED",
      totalCost: 1200.0,
      room: {
        id: 202,
        roomNumber: "202B",
        roomType: "DELUXE",
        capacity: 3,
      },
    },
    {
      id: 3,
      startDate: "2025-05-01",
      endDate: "2025-05-03",
      reservationStatus: "CHECKED_IN",
      totalCost: 350.0,
      room: {
        id: 303,
        roomNumber: "303C",
        roomType: "SINGLE",
        capacity: 1,
      },
    },
    {
      id: 4,
      startDate: "2025-04-15",
      endDate: "2025-04-20",
      reservationStatus: "COMPLETED",
      totalCost: 950.0,
      room: {
        id: 404,
        roomNumber: "404D",
        roomType: "FAMILY",
        capacity: 5,
      },
    },
    {
      id: 5,
      startDate: "2025-07-01",
      endDate: "2025-07-05",
      reservationStatus: "CANCELED",
      totalCost: 0.0,
      room: {
        id: 505,
        roomNumber: "505E",
        roomType: "PENTHOUSE",
        capacity: 4,
      },
    },
  ];

  const [bookingHistory, setBookingHistory] = useState(false);

  return (
    <div className="profile-page" style={{marginTop:'100px'}}>
      <div className="profile-header">
        <div className="title">
          <img src={ProfileImage} alt="Imagen de perfil" />
          <div className="description">
            <h1>Información personal</h1>
            <p>Gestiona tu información personal y de contacto</p>
          </div>
        </div>
        <button className="edit-profile">Editar Perfil</button>
      </div>
      <DataCard />
      <div className="booking-slider">
        <div className="slider-container">
          <button className="slider" onClick={() => setBookingHistory(false)}>
            Reservas actuales
          </button>
          <button
            className="slider"
            id="init"
            onClick={() => setBookingHistory(true)}
          >
            Historial de reservas
          </button>
        </div>
      </div>
      {reservations
        .filter((reservation) =>
          bookingHistory
            ? !["PENDING", "CONFIRMED", "CHECKED_IN"].includes(reservation.reservationStatus)
            : ["PENDING", "CONFIRMED", "CHECKED_IN"].includes(reservation.reservationStatus)
        )
        .map((reservation) => (
          <BookingCard key={reservation.id} reservation={reservation} />
        ))}
    </div>
  );
}

export default Profile;
