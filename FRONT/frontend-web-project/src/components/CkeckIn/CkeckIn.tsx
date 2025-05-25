import React, { useState } from 'react';
import { CheckResponse } from '../../models/reservation.model'; // Asegúrate de importar el modelo correcto
import { checkIn } from '../../api/services/reservations.service'; // Importar el servicio
import './Checkin.css';

const CheckIn = () => {
    const [code, setCode] = useState(''); // Código de reserva a verificar
    const [reservation, setReservation] = useState<CheckResponse | null>(null); // Estado para almacenar la respuesta de check-in
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Limpiar errores anteriores

        // Llamada al servicio real de check-in
        if (code.trim() === '') {
            setError('Por favor, ingrese un código válido.'); // Validación simple
            return;
        }

        const { call, controller } = checkIn(code); // Llamamos al servicio checkIn
        try {
            const response = await call; // Esperamos la respuesta
            setReservation(response.data); // Guardamos la respuesta en el estado
        } catch (err: any) {
            setReservation(null); // Limpiamos cualquier reserva previa
            if (err?.response?.status === 404) {
                setError('Código no encontrado. Por favor, intente nuevamente.');
            } else {
                setError('Ha ocurrido un error en el servidor. Por favor, intente nuevamente más tarde.');
            }
        }

        return () => controller.abort(); // Cancelar la solicitud en caso de desmontaje
    };

    // Si se realizó check-in correctamente
    if (reservation) {
        return (
            <div className="checkin-success-box">
                <h3 className="checkin-success-title">✅ ¡Check-In Exitoso!</h3>
                <p className="checkin-success-message">El huésped ha sido registrado exitosamente.</p>
                <div className="checkin-info-box">
                    <p><b>Nombre:</b> {reservation.name}</p>
                    <p><b>Email:</b> {reservation.email}</p>
                    <p><b>Documento:</b> {reservation.numberDocument}</p>
                    <p><b>Habitación:</b> {reservation.roomNumber} ({reservation.roomType})</p>
                    <p><b>Fecha de Check-In:</b> {new Date(reservation.checkInDate).toLocaleString()}</p>
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

    // Formulario inicial si no se ha realizado un check-in
    return (
        <form onSubmit={handleSubmit} className="checkin-form-box">
            <h3 className="checkin-title">Registro de huésped</h3>
            <p className="checkin-instruction">Ingrese el código para iniciar el check-in</p>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingrese el código de reserva"
                maxLength={6}
                required
                className="checkin-input"
            />
            <small className="checkin-small">Ejemplo: un código válido tiene 6 caracteres.</small>
            {error && <p className="checkin-error">{error}</p>} {/* Mostrar errores */}
            <button className="checkin-button" type="submit">Verificar Código</button>
        </form>
    );
};

export default CheckIn;