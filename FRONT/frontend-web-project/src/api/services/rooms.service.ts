import axios from "axios";
import { loadAbort } from "../utilities/loadAbort.utility";
import { Room, RoomFilter, RoomFilterResponse } from "../../models/rooms.model";

const BASE_URL = "http://localhost:8080/room";

interface DataProps {
    rooms: Room[];
    filters: RoomFilter;
}

export const getFilterRooms = (filters: RoomFilterResponse) => {
    const params = new URLSearchParams();

    if (filters.roomTypesResponse) params.append("type", filters.roomTypesResponse);
    if (filters.capacitiesResponse) params.append("capacity", filters.capacitiesResponse.toString());
    if (filters.amenitiesResponse && filters.amenitiesResponse.length > 0) params.append("amenityIds", filters.amenitiesResponse.toString());

    const controller = loadAbort();
    return {
        call: axios.get<DataProps>(`${BASE_URL}/filter?${params}`, { signal: controller.signal }),
        controller
    }
}