import { useEffect, useMemo, useState } from "react";
import { empyReservationResponse, ReservationProps, ReservationResponse } from "../models/reservation.model";
import dayjs, { Dayjs } from "dayjs";
import { createReservation, getAllReservation } from "../api/services/reservations.service";
import { useApi } from "../api/hooks/useApi";
import axios from "axios";
import { getRoomForId } from "../api/services/rooms.service";
import { Room } from "../models/rooms.model";
import { useNavigate } from "react-router";

export const useReservation = () => {
    const navegate = useNavigate();
    // Estados para el formulario
    const [reservationData, setReservationData] = useState<ReservationResponse>(empyReservationResponse);
    const [startValue, setStartValue] = useState<Dayjs | null>(null);
    const [endValue, setEndValue] = useState<Dayjs | null>(null);

    // Obeter habitacion por ID (GET)
    const getRoomCall = useMemo(() => getRoomForId(reservationData.roomId), [reservationData.roomId]);
    const {
        data: room,
        loading: loadingRoom,
        error: errorRoom,
        fetch: fetchRoom
    } = useApi<Room>(getRoomCall);
    useEffect(() => fetchRoom(), [fetchRoom]);

    // Obtener todas las reservaciones de la habitacion
    console.log('soy el user id: ',reservationData.roomId)
    const getReservationsCall = useMemo(() => getAllReservation(reservationData.roomId), [reservationData.roomId]); //  Aqui puedo hacer que por el cambio el apiCall el useEffect renderice lo que quiero
    const {
        data: reservations,
        loading: loadingReservations,
        error: errorReservations,
        fetch: fetchReservations
    } = useApi<ReservationProps[]>(getReservationsCall);
    useEffect(() => fetchReservations(), [fetchReservations]);
    console.log("Soly la reserva de la habitacion 3: ", reservations)

    // Función para crear una nueva reserva (POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const reservationStatus = 'CONFIRMED';
        const formattedStart = startValue?.format("YYYY-MM-DDTHH:mm:ss") ?? "";
        const formattedEnd = endValue?.format("YYYY-MM-DDTHH:mm:ss") ?? "";

        if (
            !reservationData.roomId ||
            !reservationStatus ||
            !startValue ||
            !endValue
        ) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const newReservation: ReservationResponse = {
            ...reservationData,
            reservationStatus: reservationStatus,
            startDate: formattedStart,
            endDate: formattedEnd,
        };

        const { call, controller } = createReservation(newReservation);

        try {
            const response = await call;
            console.log("Reserva creada:", response.data);
            navegate("/profile");
            fetchReservations();
        } catch (err: any) {
            if (axios.isCancel(err)) {
                console.warn("Solicitud cancelada:", err.message);
            } else {
                console.error("Error al crear la reserva:", err);
                alert("Error al realizar la reserva, verifique los datos ingresados")
            }
        }

        return () => {
            controller.abort();
        };
    };

    // Bloquear fechas ya reservadas
    let blockedData: Dayjs[] = [];
    reservations?.forEach((prev) => {
        const startDate = dayjs(prev.startDate);
        const endDate = dayjs(prev.endDate);

        const fechas: dayjs.Dayjs[] = [];
        let currenDate = startDate;
        while (currenDate.isBefore(endDate) || currenDate.isSame(endDate)) {
            fechas.push(currenDate);
            currenDate = currenDate.add(1, "day");
        }
        blockedData = blockedData.concat(fechas);
    });

    // Retornar todo lo necesario al componente
    return {
        reservationData,
        setReservationData,
        startValue,
        setStartValue,
        endValue,
        setEndValue,
        room,
        loadingRoom,
        errorRoom,
        reservations,
        loadingReservations,
        errorReservations,
        handleSubmit,
        blockedData
    };
}