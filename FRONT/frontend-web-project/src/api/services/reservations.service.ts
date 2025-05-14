import { ReservationProps, ReservationResponse } from "../../models/reservation.model";
import { UseApiCall } from "../models/useApi.model";
import { loadAbort } from "../utilities/loadAbort.utility";
import { getHttpClient } from "./axios.service";

const BASE_URL = "/reservation";

export const getAllReservation = (): UseApiCall<ReservationProps[]> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.get<ReservationProps[]>(`${BASE_URL}/getByStatusNot`, { signal: controller.signal }),
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
