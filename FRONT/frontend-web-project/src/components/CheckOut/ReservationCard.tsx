import React from 'react';
import { Reservation } from '../../models/reservation.model';
import './ReservationCard.css';
interface Props {
    reservation: Reservation;
    onSelect: (id: number) => void;
}
const ReservationCard: React.FC<Props> = ({ reservation, onSelect }) => {
    return (
        <div className="reservation-card">
            <div className="reservation-card__info">
                <i className="fas fa-user reservation-card__icon" />
                <div className="reservation-card__text">
                    <p className="reservation-card__name">{reservation.client.name}</p>
                    <p className="reservation-card__room">
                        Room {reservation.room.number} - {reservation.room.type}
                    </p>
                </div>
            </div>
            <button
                className="reservation-card__button"
                onClick={() => onSelect(reservation.id)}
            >
                Select
            </button>
        </div>

    );
};

export default ReservationCard;