import React, { useState } from 'react';
import { Reservation } from '../../models/reservation.model';
import './Checkin.css';

const mockReservation: Reservation = {
    id: 1,
    customerId: 101,
    date: '2025-05-20T14:00:00',
    client: {
        name: "Jorges G",
        email: "asdlkjad@gmail.com"
    },
    endDate: null,
    reservationStatus: 'ToAprove',
    totalCost: 1200,
    taxes: 200,
    checkInDate: '2025-05-20T14:00:00',
    checkOutDate: null,
    room: {
        id: 301,
        number: '301',
        type: 'Deluxe King',
    },
};

const CheckIn = () => {
    const [code, setCode] = useState('');
    const [reservation, setReservation] = useState<Reservation | null>(null);
    //"reservation" es la respuesta positiva (info de la reserva) al pasar un codigo valido

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // llamada al endpoint de verificar el codigo, que almacenará la respuesta positiva (json) en reservation
        if (code.startsWith('E') && code.length === 6) {
            setReservation(mockReservation); // Simulamos respuesta positiva
        } else {
            alert('Código inválido. Debe comenzar con "E" y tener 6 dígitos.');
        }
    };

    if (reservation) {
        return (
            <div className="checkin-success-box">
                <h3 className="checkin-success-title">✅ Check-In Successful!</h3>
                <p className="checkin-success-message">The guest has been successfully checked in.</p>
                <div className="checkin-info-box">
                    <p><b>Name:</b> {reservation.client.name}</p>
                    <p><b>Email:</b> {reservation.client.email}</p>
                    <p><b>ID Number:</b> {reservation.client.document}</p>
                    <p><b>Room:</b> {reservation.room.number} ({reservation.room.type})</p>
                    <p><b>Check-In Date:</b> {reservation.date}</p>
                </div>
                <button
                    className="checkin-button"
                    onClick={() => {
                        setReservation(null);
                        setCode('');
                    }}
                >
                    Nuevo Check-In
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="checkin-form-box">
            <h3 className="checkin-title">Registro de huésped</h3>
            <p className="checkin-instruction">Ingrese el código para iniciar el check-in</p>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingrese el código de 6 dígitos"
                maxLength={6}
                required
                className="checkin-input"
            />
            <small className="checkin-small">Ejemplo: todo código que empiece en "E" es válido</small>
            <button className="checkin-button" type="submit">VERIFICAR CÓDIGO</button>
        </form>
    );

};

export default CheckIn;
