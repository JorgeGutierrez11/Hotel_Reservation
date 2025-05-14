import { ReservationResponse } from "../../models/reservation.model"

interface ReservationFormProps {
    reservationData: ReservationResponse,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent) => Promise<(() => void) | undefined>
}

export const ReservationForm = ({ reservationData, handleInputChange, handleSubmit }: ReservationFormProps) => {
    const reservationStatus = [
        "PENDING",
        "CONFIRMED",
        "CHECKED_IN",
        "COMPLETED",
        "CANCELED",
    ];
    return (
        <>
            <h1>Crear Reserva</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="customerId">cliente id</label>
                    <input
                        type="text"
                        id="customerId"
                        name="customerId"
                        value={reservationData.customerId}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="reservationStatus">Estado</label>
                    <input
                        type="text"
                        id="reservationStatus"
                        name="reservationStatus"
                        value={reservationData.reservationStatus}
                        onChange={handleInputChange}
                    />
                    <select id="reservationStatus" name="reservationStatus">
                        {reservationStatus.map((status, i)=> (
                            <option key={i} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Crear Reserva</button>
            </form>
        </>
    )
}