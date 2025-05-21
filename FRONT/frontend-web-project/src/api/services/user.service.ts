import { User } from "../../models/client.model"
import { loadAbort } from "../utilities/loadAbort.utility"
import { UseApiCall } from "../models/useApi.model"
import { getHttpClient } from "./axios.service"

const BASE_URL = "/User"

export const getUser = (id: number): UseApiCall<User> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.get<User>(`${BASE_URL}/${id}`, { signal: controller.signal }),
        controller
    };
}

export const getAllUsers = (): UseApiCall<User> => { // Puede estas muy mal
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.get<User>(`${BASE_URL}`, { signal: controller.signal }),
        controller
    };
}

export const createUser = (User: User): UseApiCall<User> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.post<User>(`${BASE_URL}`, User, { signal: controller.signal }),
        controller
    };
}

export const updateUser = (id: number, User: User): UseApiCall<User> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.put<User>(`${BASE_URL}/${id}`, User, { signal: controller.signal }),
        controller
    };
}

export const deleteUser = (id: number): UseApiCall<void> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.delete<void>(`${BASE_URL}/deleteUser/${id}`, { signal: controller.signal }),
        controller
    };
}