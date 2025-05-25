import React, { useState, useEffect } from 'react';
import { CheckResponse } from '../../models/reservation.model'; // Usar CheckResponse
import ReservationCard from './ReservationCard';
import { getAllCheckOuts, checkOut } from '../../api/services/reservations.service'; // Servicios necesarios
import './CheckOut.css';

const CheckOut: React.FC = () => {
    const [reservations, setReservations] = useState<CheckResponse[]>([]); // Cambiar a lista de CheckResponse
    const [selectedReservation, setSelectedReservation] = useState<CheckResponse | null>(null); // Cambiar el tipo
    const [message, setMessage] = useState<string | null>(null); // Mensaje para notificaciones
    const [loading, setLoading] = useState<boolean>(false); // Controlar el estado de carga

    // Cargar las reservas pendientes desde el backend
    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const { call } = getAllCheckOuts(); // Llamar el servicio para obtener reservas pendientes
                const response = await call;
                setReservations(response.data); // Guardar las reservas devueltas
            } catch (err: any) {
                setMessage('Error al cargar las reservas disponibles.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // Manejar la selección de una reserva a través del bookingCode
    const handleSelect = (bookingCode: string) => {
        const found = reservations.find(reservation => reservation.bookingCode === bookingCode);
        if (found) {
            setSelectedReservation(found); // Actualizar la reserva seleccionada
        }
    };

    // Manejar el check-out tras confirmar la selección
    const handleCheckOut = async () => {
        if (!selectedReservation) return;

        setLoading(true);
        setMessage(null);

        try {
            const { call } = checkOut(selectedReservation.bookingCode); // Llamar el servicio checkOut
            const response = await call;

            // Actualizar el mensaje con los datos del check-out
            const result: CheckResponse = response.data;
            setMessage(`✅ Check-out realizado correctamente para: ${result.name}`);
        } catch (err: any) {
            setMessage('Error al realizar el check-out. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
            setSelectedReservation(null); // Limpiar la selección
        }
    };

    // Renderizar información de la reserva seleccionada para check-out
    if (selectedReservation) {
        return (
            <div className="checkout-form-box">
                <h3 className="checkout-success-title">Check-Out</h3>
                {message && <p className="checkout-success-message">{message}</p>}
                <div className="checkout-info-box">
                    <p><b>Nombre:</b> {selectedReservation.name}</p>
                    <p><b>Email:</b> {selectedReservation.email}</p>
                    <p><b>Documento:</b> {selectedReservation.numberDocument}</p>
                    <p><b>Habitación:</b> {selectedReservation.roomNumber} ({selectedReservation.roomType})</p>
                    <p><b>Fecha de Check-In:</b> {new Date(selectedReservation.checkInDate).toLocaleDateString()}</p>
                </div>
                <button className="checkout-button" onClick={handleCheckOut} disabled={loading}>
                    {loading ? 'Procesando...' : 'Confirmar Check-Out'}
                </button>
                <button
                    className="checkout-button-secondary"
                    onClick={() => setSelectedReservation(null)}
                >
                    Cancelar
                </button>
            </div>
        );
    }

    // Renderizar la lista de reservas pendientes si no se ha seleccionado ninguna
    return (
        <div className="checkout-selection-box">
            <h3 className="checkout-title">Registro de Check-Out</h3>
            {message && <p className={message.startsWith('✅') ? 'checkout-success-message' : 'checkout-error-message'}>{message}</p>}
            <p className="checkout-instruction">Seleccione al huésped que desea hacer check-out:</p>
            {loading ? (
                <p>Cargando reservas...</p>
            ) : reservations.length > 0 ? (
                <div className="checkout-reservation-list">
                    {reservations.map((res) => (
                        <ReservationCard key={res.bookingCode} reservation={res} onSelect={handleSelect} />
                    ))}
                </div>
            ) : (
                <p className="checkout-no-reservations">No hay reservas pendientes para check-out.</p>
            )}
        </div>
    );
};

export default CheckOut;