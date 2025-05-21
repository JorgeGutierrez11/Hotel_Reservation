import DataCard from "../components/ReservationCards/DataCard";
import BookingCard from "../components/ReservationCards/BookingCard";
import ProfileImage from "../assets/user-profile.svg";
import { useEffect, useMemo, useState } from "react";
import { Reservation } from "../models/reservation.model";
import "./Profile.css";
import { getUserReservations } from "../api/services/reservations.service";
import { useApi } from "../api/hooks/useApi";

function Profile() {
  const userCall = useMemo(() => getUserReservations(), []);
  const { data: reservations, loading, error, fetch } = useApi<Reservation[]>(userCall);
  useEffect(() => fetch(), [fetch]);

  const [bookingHistory, setBookingHistory] = useState(false);

  if (loading) return <p>Cargando reservas...</p>;
  if (error) return <p>Error al cargar las reservas.</p>;
  if (!reservations) return <p>No se encontraron reservas disponibles</p>;
  return (
    <div className="profile-page" style={{ paddingTop: '100px' }}>
      <div className="profile-header">
        <div className="profile-header-title">
          <img src={ProfileImage} alt="Imagen de perfil" />
          <div className="profile-header-description">
            <h1>Información personal</h1>
            <p>Gestiona tu información personal y de contacto</p>
          </div>
        </div>
        <button className="profile-edit-button">Editar Perfil</button>
      </div>
      <DataCard />
      <div className="slider-actions">
        <div className="slider-container">
          <button
            className={`slider ${bookingHistory === false ? "active" : ""}`}
            onClick={() => setBookingHistory(false)}>
            Reservas actuales
          </button>
          <button
            className={`slider ${bookingHistory === true ? "active" : ""}`}
            onClick={() => setBookingHistory(true)}
          >
            Historial de reservas
          </button>
        </div>
      </div>
      <div className="bookingcard-container">
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
    </div>
  );
}

export default Profile;
