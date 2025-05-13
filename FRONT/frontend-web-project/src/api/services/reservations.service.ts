import axios from "axios";
import { ReservationProps, ReservationResponse } from "../../models/reservation.model";
import { UseApiCall } from "../models/useApi.model";
import { loadAbort } from "../utilities/loadAbort.utility";

const BASE_URL = "http://localhost:8080/reservation";

export const getAllReservation = (): UseApiCall<ReservationProps[]> => {
    const controller = loadAbort();
    return {
        call: axios.get<ReservationProps[]>(`${BASE_URL}/getAll`, { signal: controller.signal }),
        controller
    }
}

export const createReservation = (props: ReservationResponse) => {
    const controller = loadAbort();
    return {
        call: axios.post(`${BASE_URL}/create`, props, {
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
            },
        }),
        controller,
    };
};
