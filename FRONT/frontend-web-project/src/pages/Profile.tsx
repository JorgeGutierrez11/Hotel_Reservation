import { useEffect, useMemo, useState } from "react";
import { getFilterRooms } from "../api/services/rooms.service";
import { useApi } from "../api/hooks/useApi";
import { emptyRoomFilter, Room, RoomFilter } from "../models/rooms.model";

interface DataProps {
    rooms: Room[];
    filters: RoomFilter;
}

export const Profile = () => {
    const [filters, setFilters] = useState<RoomFilter>(emptyRoomFilter);

    // Solo memorizar la función sin ejecutarla
    const apiCall = useMemo(() => getFilterRooms(filters), [filters]);

    const { data, error, loading, fetch } = useApi<DataProps>(apiCall);

    useEffect(() => {
        fetch();
    }, [fetch]);

    console.log(data?.filters.roomTypes)

    return (
        <h1>soy la vista del perfil</h1>
    );
};
