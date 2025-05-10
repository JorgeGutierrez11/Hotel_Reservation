import axios from "axios";
import { loadAbort } from "../utilities/loadAbort.utility";
import { UseApiCall } from "../models/useApi.model";
import { Amenity } from "../../models/amenitys.model";

const BASE_URL = "http://localhost:8080/amenity";

export const getAllAmenitys = (): UseApiCall<Amenity[]> => {
    const controller = loadAbort();
    return {
        call: axios.get<Amenity[]>(`${BASE_URL}/getAll`, { signal: controller.signal }),
        controller
    }
}