import { loadAbort } from "../utilities/loadAbort.utility";
import { Room, RoomFilter, RoomFilterResponse } from "../../models/rooms.model";
import { getHttpClient } from "./axios.service";

const BASE_URL = "/room";

interface DataProps {
    rooms: Room[];
    filters: RoomFilter;
}

export const getFilterRooms = (filters: RoomFilterResponse) => {
    const http = getHttpClient();
    const params = new URLSearchParams();

    if (filters.roomTypesResponse) params.append("type", filters.roomTypesResponse);
    if (filters.capacitiesResponse) params.append("capacity", filters.capacitiesResponse.toString());
    if (filters.amenitiesResponse && filters.amenitiesResponse.length > 0) params.append("amenityIds", filters.amenitiesResponse.toString());

    const controller = loadAbort();
    return {
        call: http.get<DataProps>(`${BASE_URL}/filter?${params}`, { signal: controller.signal }),
        controller
    }
}

export const getRoomForId = (id: number) => {
    const http = getHttpClient();
    const controller = loadAbort();
    return {
        call: http.get<Room>(`${BASE_URL}/get/${id}`, { signal: controller.signal }),
        controller
    }
}