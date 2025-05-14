import axios from "axios"
import { Client } from "../../models/client.model"
import { loadAbort } from "../utilities/loadAbort.utility"
import { UseApiCall } from "../models/useApi.model"
import { getHttpClient } from "./axios.service"

const BASE_URL = "/client"

export const getClient = (id: number): UseApiCall<Client> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.get<Client>(`${BASE_URL}/${id}`, { signal: controller.signal }),
        controller
    };
}

export const getAllClients = (): UseApiCall<Client> => { // Puede estas muy mal
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.get<Client>(`${BASE_URL}`, { signal: controller.signal }),
        controller
    };
}

export const createClient = (client: Client): UseApiCall<Client> => {
    const controller = loadAbort();
    const http = getHttpClient();
    return {
        call: http.post<Client>(`${BASE_URL}`, client, { signal: controller.signal }),
        controller
    };
}

export const updateClient = (id: number, client: Client): UseApiCall<Client> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.put<Client>(`${BASE_URL}/${id}`, client, { signal: controller.signal }),
        controller
    };
}

export const deleteClient = (id: number): UseApiCall<void> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.delete<void>(`${BASE_URL}/deleteClient/${id}`, { signal: controller.signal }),
        controller
    };
}