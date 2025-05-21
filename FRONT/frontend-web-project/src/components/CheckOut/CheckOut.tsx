import React, { useState, useEffect } from 'react';
import { Reservation } from '../../models/reservation.model';
import ReservationCard from './ReservationCard';
import '../../pages/Check.css';

const mockReservations: Reservation[] = [
    {
        id: 1,
        customerId: 101,
        startDate: '2025-05-20T14:00:00',
        endDate: null,
        reservationStatus: 'PENDING',
        totalCost: 1200,
        taxes: 200,
        client: {
            name: "Jorge G",
            email: "asdlkjad@gmail.com"
        },
        checkInDate: '2025-05-20T14:00:00',
        checkOutDate: null,
        room: {
            id: 301,
            number: '301',
            type: 'Deluxe King',
        },
    },
    {
        id: 2,
        customerId: 102,
        client: {
            name: "Andres J",
            email: "asdlkjad@gmail.com"
        },
        startDate: '2025-05-21T15:00:00',
        endDate: null,
        reservationStatus: 'PENDING',
        totalCost: 800,
        taxes: 100,
        checkInDate: '2025-05-21T15:00:00',
        checkOutDate: null,
        room: {
            id: 101,
            number: '101',
            type: 'Standard Double',
        },
    },
];

const CheckOut: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

    useEffect(() => {
        setReservations(mockReservations);
    }, []);

    const handleSelect = (id: number) => {
        const found = reservations.find(r => r.id === id);
        if (found) {
            setSelectedReservation(found);
        }
    };

    const handleCheckOut = () => {
        if (selectedReservation) {
            // Simular llamada a endpoint (por ejemplo: await checkoutReservation(selectedReservation.id))
            console.log(`Check-out realizado para ID: ${selectedReservation.id}`);
        }

        // Limpiar selección
        setSelectedReservation(null);
    };

    if (selectedReservation) {
        return (
            <div className="form-box">
                <h3>✅ Check-Out Successful!</h3>
                <p>The guest has been successfully checked out.</p>
                <div className="info-box">
                    <p><b>Name:</b> {selectedReservation.client.name}</p>
                    <p><b>Email:</b> {selectedReservation.client.email}</p>
                    <p><b>Room:</b> {selectedReservation.room.number} ({selectedReservation.room.type})</p>
                    <p><b>Check-In Date:</b> {new Date(selectedReservation.checkInDate).toLocaleDateString()}</p>
                </div>
                <button className="btn" onClick={handleCheckOut}>Nuevo Check-Out</button>
            </div>
        );
    }

    return (
        <div className="form-box">
            <h3>Guest Check-Out</h3>
            <p>Seleccione al huésped que desea hacer check-out:</p>
            <div className="reservation-list">
                {reservations.map((res) => (
                    <ReservationCard key={res.id} reservation={res} onSelect={handleSelect} />
                ))}
            </div>
        </div>
    );
};

export default CheckOut;
