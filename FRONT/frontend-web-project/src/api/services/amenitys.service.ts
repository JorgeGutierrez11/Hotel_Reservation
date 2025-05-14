import { loadAbort } from "../utilities/loadAbort.utility";
import { UseApiCall } from "../models/useApi.model";
import { Amenity } from "../../models/amenitys.model";
import { getHttpClient } from "./axios.service";

const BASE_URL = "/amenity";

export const getAllAmenitys = (): UseApiCall<Amenity[]> => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.get<Amenity[]>(`${BASE_URL}/getAll`, { signal: controller.signal }),
        controller
    }
}