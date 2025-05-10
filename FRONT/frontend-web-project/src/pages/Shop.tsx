import { useEffect, useMemo, useState } from "react"
import { emptyRoomFilter, Room, RoomFilter } from "../models/rooms.model";
import { getFilterRooms } from "../api/services/rooms.service";
import { useApi } from "../api/hooks/useApi";
import { BarRoomFilter } from "../components/RoomFilter/RoomFilter";

export const Shop = () => {

    const [filters, setFilters] = useState<RoomFilter>(emptyRoomFilter);

    const apiCall = useMemo(() => getFilterRooms(filters), [filters]);
    const { data: rooms, error, loading, fetch } = useApi<Room[]>(apiCall);
    useEffect(() => {
        fetch();
    }, [fetch]);

    const filterData = (data: RoomFilter)  => {
        console.log(`recibi la ${data.amenityIds} - ${data.capacity} - ${data.type}`)
        setFilters({ ...filters, capacity: data.capacity, amenityIds: [1,2], type: data.type });
    }

/*     const applyFilters = () => {
        setFilters({ ...filters, capacity: 3 });
    } */

    return (
        <>
            <BarRoomFilter sendData={filterData}/>
            <div style={{ background: "red" }}>
                <h2>Lista de habitaciones</h2>
{/*                 <button onClick={applyFilters}>
                    Ver disponibles
                </button> */}
                <ul>
                    {rooms?.map((room) => (
                        <li key={room.id}>
                            {room.id} - {room.roomType} -
                            {room.amenity.map((ame) => (
                                <div key={ame.id}>{ame.name}</div>
                            ))}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}