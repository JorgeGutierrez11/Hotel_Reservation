import { ReservationProps, ReservationResponse, ReservationToCheckOut } from "../../models/reservation.model";
import { CheckResponse } from "../../models/reservation.model";
import { UseApiCall } from "../models/useApi.model";
import { loadAbort } from "../utilities/loadAbort.utility";
import { getHttpClient } from "./axios.service";

const BASE_URL = "/reservation";

// Servicio para realizar check-in
export const checkIn = (bookingCode: string): UseApiCall<CheckResponse> => {
    console.log('soy el puto codigo', bookingCode);
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.post<CheckResponse>(`${BASE_URL}/check-in`, bookingCode, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
            },
        }),
        controller,
    };
};

// Servicio para realizar check-out
export const checkOut = (bookingCode: string): UseApiCall<CheckResponse> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.post<CheckResponse>(`${BASE_URL}/check-out`, bookingCode, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
            },
        }),
        controller,
    };
};

// Obtener todos los check-outs
export const getAllCheckOuts = (): UseApiCall<CheckResponse[]> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.get<CheckResponse[]>(`${BASE_URL}/check-out`, { signal: controller.signal }),
        controller,
    };
};

export const getAllReservation = (id: number): UseApiCall<ReservationProps[]> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.get<ReservationProps[]>(`${BASE_URL}/filter/${id}`, { signal: controller.signal }),
        controller
    }
}
export const listPendingReservations = (): UseApiCall<ReservationToCheckOut[]> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.get<ReservationToCheckOut[]>(`${BASE_URL}/getByStatusNot`, { signal: controller.signal }),
        controller
    }
}
export const createReservation = (props: ReservationResponse) => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.post(`${BASE_URL}/create`, props, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
            },
        }),
        controller,
    };
};

export const getUserReservations = () => {
    const http = getHttpClient();   
    const controller = loadAbort();
    return {
        call: http.get(`${BASE_URL}/reservations`, {signal: controller.signal}),
        controller
    }
}
