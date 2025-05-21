import { Client } from "../../models/client.model"
import { loadAbort } from "../utilities/loadAbort.utility"
import { UseApiCall } from "../models/useApi.model"
import { getHttpClient } from "./axios.service"
import { UserRequest} from '../../models/userRec.model';
const BASE_URL = "/auth"
export const createUser = (UserRequest: UserRequest): UseApiCall<Client> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {

        call: http.post<Client>(`${BASE_URL}/register`, UserRequest, { signal: controller.signal }),
        controller
    };
}
export const recoverPassword = (email:string): UseApiCall<Client> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.post<Client>(`${BASE_URL}/login`, email, { signal: controller.signal }),
        controller
    };
}
/*
export const getUser = (id: number): UseApiCall<Client> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.get<Client>(`${BASE_URL}/${id}`, { signal: controller.signal }),
        controller
    };
}

export const getAllUsers = (): UseApiCall<Client> => { // Puede estas muy mal
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.get<Client>(`${BASE_URL}`, { signal: controller.signal }),
        controller
    };
}



export const updateUser = (id: number, User: User): UseApiCall<Client> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.put<Client>(`${BASE_URL}/${id}`, User, { signal: controller.signal }),
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
*/