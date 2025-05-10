import { useEffect, useRef, useState } from "react";
import "./RoomFilter.css"
import { RoomFilterResponse } from "../../models/rooms.model";

interface Props {
    sendData: (data: RoomFilterResponse) => void,
    capacityOptions: number[],
    roomTypeOptions: string[],
    amenityOptions: string[]
}

export const BarRoomFilter = ({ sendData, capacityOptions, roomTypeOptions, amenityOptions }: Props) => {
    const [roomType, setRoomType] = useState<string>('');
    const [amenitys, setAmenitys] = useState<string[]>([]);
    const [amenitysres, setAmenitysres] = useState<number[]>([]);
    const [capacity, setCapacity] = useState<number>(0);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<boolean>(false);
    const dropdownActive = () => setActive((prev) => !prev);

    const send = () => sendData({ roomTypesResponse: roomType, capacitiesResponse: capacity, amenitiesResponse: amenitysres });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActive(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="filters-container">
            <h2 className="filters-title">Selecciona tu habitación ideal</h2>
            <div className="filters-grid">
                <div className="filter-group">
                    <label htmlFor="capacity">Capacidad</label>
                    <select id="capacity" onChange={(e) => setCapacity(Number(e.target.value))}>
                        <option value="">Cualquier Capacidad</option>
                        {capacityOptions.map((option) => (
                            <option key={option} value={option}>
                                {option === 1
                                    ? `${option} Persona`
                                    : `${option} Personas`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="type">Tipo de habitación</label>
                    <select id="type" onChange={(e) => setRoomType(e.target.value)}>
                        <option value="">Seleccione tipo de habitaccion</option>
                        {roomTypeOptions?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group" ref={dropdownRef}>
                    <label htmlFor="amenitys">Lista de comodidades</label>
                    <div className="dropdown">
                        <button type="button" className="dropdown-toggle" onClick={dropdownActive}>selecciona las comodidades </button>
                        {active && (
                            <div className="dropdown-menu">
                                {amenityOptions?.map((option, i) => (
                                    <label key={option}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={amenitys.includes(option)}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setAmenitys((prev) =>
                                                    prev.includes(value) ? prev.filter((a) => a != value) : [...prev, value]
                                                );

                                                setAmenitysres((prev) =>
                                                    prev.includes(i+1) ? prev.filter((a) => a != i+1) : [...prev, i+1]
                                                );
                                            }}
                                        />{option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button className="reset-button" onClick={send}>Filtrar</button>
        </div>
    );
};
