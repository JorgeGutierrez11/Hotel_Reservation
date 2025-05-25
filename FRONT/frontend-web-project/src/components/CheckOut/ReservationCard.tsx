import React from 'react';
import { CheckResponse } from '../../models/reservation.model'; // Cambiar al tipo CheckResponse
import './ReservationCard.css';

interface Props {
    reservation: CheckResponse; // Cambiar el tipo de dato a CheckResponse
    onSelect: (bookingCode: string) => void; // Usar el bookingCode único para seleccionar
}

const ReservationCard: React.FC<Props> = ({ reservation, onSelect }) => {
    return (
        <div className="reservation-card">
            <div className="reservation-card__info">
                <i className="fas fa-user reservation-card__icon" />
                <div className="reservation-card__text">
                    <p className="reservation-card__name">{reservation.name}</p>
                    <p className="reservation-card__room">
                        Room {reservation.roomNumber} - {reservation.roomType}
                    </p>
                </div>
            </div>
            <button
                className="reservation-card__button"
                onClick={() => onSelect(reservation.bookingCode)} // Enviar bookingCode
            >
                Select
            </button>
        </div>
    );
};

export default ReservationCard;