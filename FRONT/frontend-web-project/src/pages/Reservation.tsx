import { Calendar } from "../components/Calendar/Calendar"
import { createReservation, getAllReservation } from "../api/services/reservations.service";
import { empyReservationResponse, ReservationProps, ReservationResponse } from "../models/reservation.model";
import { useApi } from "../api/hooks/useApi";
import React, { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import './Reservation.css'
import axios from "axios";

export const Reservation = () => {
    const [reservationData, setReservationData] = useState<ReservationResponse>(empyReservationResponse);
    const [startValue, setStartValue] = useState<Dayjs | null>(null);
    const [endValue, setEndValue] = useState<Dayjs | null>(null);

    /* Obtengo todas las reservaciones */
    const getReservationsCall = useMemo(() => getAllReservation(), []);
    const { data: reservations, loading: loadingGet, error: errorGet, fetch: fetchReservations } = useApi<ReservationProps[]>(getReservationsCall);
    useEffect(() => fetchReservations(), [fetchReservations]);

    /* Creo una nueva reserva */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedStart = startValue?.format('YYYY-MM-DDTHH:mm:ss') ?? '';
        const formattedEnd = endValue?.format('YYYY-MM-DDTHH:mm:ss') ?? '';

        if (
            !reservationData.customerId ||
            !reservationData.roomId ||
            !reservationData.reservationStatus ||
            !startValue ||
            !endValue
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const newReservation: ReservationResponse = {
            ...reservationData,
            startDate: formattedStart,
            endDate: formattedEnd,
        };

        const { call, controller } = createReservation(newReservation);

        try {
            const response = await call;
            console.log("Reserva creada:", response.data);
            fetchReservations();
        } catch (err: any) {
            if (axios.isCancel(err)) {
                console.warn("Solicitud cancelada:", err.message);
            } else if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message);
            } else {
                console.error("Error al crear la reserva:", err);
                console.log(err.response.data.message);
            }
        }

        return () => {
            controller.abort();
        };
    }


    /* Funcion de fechas */
    var blockedData: Dayjs[] = [];
    reservations?.forEach((prev) => {
        const startDate = dayjs(prev.startDate);
        const endDate = dayjs(prev.endDate);

        const fechas: dayjs.Dayjs[] = [];
        let currenDate = startDate;
        while (currenDate.isBefore(endDate) || currenDate.isSame(endDate)) {
            fechas.push(currenDate);
            currenDate = currenDate.add(1, 'day');
        }
        blockedData = blockedData.concat(fechas)
    })

    /* Controlador de formaulario */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReservationData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    return (
        <div className="reservation-container" style={{ 'marginTop': '100px' }}>
            <div className="reservation-left">
                <div className="left-calendar">
                    Start Date
                    <Calendar blockedDates={blockedData} setValue={setStartValue} value={startValue} />
                    End Date
                    <Calendar blockedDates={blockedData} setValue={setEndValue} value={endValue} minDate={startValue} />
                </div>
                <div className="left-inputs">
                    <div>
                        <h1>Crear Reserva</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="customerId">cliente id</label>
                                <input
                                    type="text"
                                    id="customerId"
                                    name="customerId"
                                    value={reservationData.customerId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="roomId">Room id</label>
                                <input
                                    type="text"
                                    id="roomId"
                                    name="roomId"
                                    value={reservationData.roomId}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="reservationStatus">Estado</label>
                                <input
                                    type="text"
                                    id="reservationStatus"
                                    name="reservationStatus"
                                    value={reservationData.reservationStatus}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit">Crear Reserva</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="reservation-right">
                <div className="right-summary">
                    <h3>Fecha inicio {startValue?.format('dddd-MMM/DD/YYYY')}</h3>
                    <h3>Fecha fin {endValue?.format('dddd-MMM/DD/YYYY')}</h3>
                </div>
                <div className="right-payment">

                </div>
            </div>
        </div>
    )
}