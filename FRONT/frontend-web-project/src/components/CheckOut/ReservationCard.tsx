import React from 'react';
import { Reservation } from '../../models/reservation.model';
import '../../pages/Check.css';
import './ReservationCard.css';
interface Props {
    reservation: Reservation;
    onSelect: (id: number) => void;
}
const ReservationCard: React.FC<Props> = ({ reservation, onSelect }) => {
    return (
        <div className="reservation-card-ui">
            <div className="info">
                <i className="fas fa-user icon" />
                <div className="text">
                    <p className="name">{reservation.client.name}</p>
                    <p className="room">Room {reservation.room.number} - {reservation.room.type}</p>
                </div>
            </div>
            <button
                className="btn-select"
                onClick={() => onSelect(reservation.id)}
            >
                Select
            </button>

        </div>
    );
};

export default ReservationCard;