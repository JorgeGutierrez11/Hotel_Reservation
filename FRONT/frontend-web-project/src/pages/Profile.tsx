import DataCard from "../components/ReservationCards/DataCard";
import BookingCard from "../components/ReservationCards/BookingCard";
import ProfileImage from "../assets/user-profile.svg";
import { useEffect, useMemo, useState } from "react";
import { Reservation } from "../models/reservation.model";
import "./Profile.css";
import { getUserReservations } from "../api/services/reservations.service";
import { useApi } from "../api/hooks/useApi";

function Profile() {
  const [bookingHistory, setBookingHistory] = useState(false);

  /* Cargo la informacion del usuario al que pertenece el token */
  /* const userCall = useMemo(() => )
 */
  /* Cargo las reservas del usuario al que pertenece el token */
  const reservationCall = useMemo(() => getUserReservations(), []);
  const { data: reservations, loading, error, fetch } = useApi<Reservation[]>(reservationCall);
  useEffect(() => fetch(), [fetch]);

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
        {reservations ? (
          (() => {
            const reservationList = reservations.filter((reservation) =>
              bookingHistory
                ? reservation.reservationStatus
                : ["PENDING", "CONFIRMED", "CHECKED_IN"].includes(reservation.reservationStatus)
            );

            return reservationList.length > 0 ? (
              reservationList.slice().reverse().map((reservation) => (
                <>
                  {console.log("soy el estado de la reserva", reservation.reservationStatus)}
                  <BookingCard key={reservation.id} reservation={reservation} />
                </>
              ))
            ) : (
              <div>No hay reservas que coincidan con el filtro</div>
            );
          })()
        ) : (
          <div>No hay reservas a mostrar</div>
        )}

      </div>
    </div>
  );
}

export default Profile;
