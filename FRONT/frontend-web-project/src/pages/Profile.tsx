import DataCard from "../components/ReservationCards/DataCard";
import BookingCard from "../components/ReservationCards/BookingCard";
import ProfileImage from "../assets/user-profile.svg";
import { useEffect, useMemo, useState } from "react";
import { Reservation } from "../models/reservation.model";
import "./Profile.css";
import { getUserReservations } from "../api/services/reservations.service";
import { useApi } from "../api/hooks/useApi";
import { getUser } from "../api/services/user.service";
import { Client } from "../models/client.model";

function Profile() {
  const userReservationCall = useMemo(() => getUserReservations(), []);
  const { data: reservations, loading, error, fetch } = useApi<Reservation[]>(userReservationCall);
  useEffect(() => fetch(), [fetch]);

  const userInfoCall = useMemo(() => getUser(), []);
  const {data: info, error: infoError, loading: infoLoading, fetch: infoFetch} = useApi<Client>(userInfoCall);
  useEffect(() => infoFetch(), [infoFetch])

  const [bookingHistory, setBookingHistory] = useState(false);

  if (loading || infoLoading) return <p>Cargando datos del usuario...</p>;
  if (error || infoError) return <p>Error al cargar los datos.</p>;
  if (!reservations || !info) return <p>No se a encontrado informacion del usuario</p>;
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
      <DataCard userData={info}/>
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
          ).reverse()
          .map((reservation) => (
            <BookingCard key={reservation.id} reservation={reservation} />
          ))}
      </div>
    </div>
  );
}

export default Profile;
