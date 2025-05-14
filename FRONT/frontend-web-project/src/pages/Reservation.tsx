import { useParams } from 'react-router';
import { DateSelector } from '../components/Calendar/DateSelector';
import { useReservation } from '../hooks/useReservation';
import { ReservationSummary } from '../components/ReservationCards/ReservationSummary';
import { useEffect } from 'react';
import './Reservation.css'
import { PaymentMethodForm } from '../components/ReservationCards/PaymentMethodForm';

export const Reservation = () => {
    const { id } = useParams<{ id: string }>();
    const roomId = Number(id);
    const customerId = 2;
    const {
        setReservationData, startValue, endValue,
        setStartValue, setEndValue, handleSubmit,
        blockedData, room
    } = useReservation();
    const nights = endValue?.diff(startValue, 'day');

    useEffect(() => (
        setReservationData((prevData) => ({
            ...prevData,
            customerId: customerId,
            roomId: roomId
        }))
    ), [roomId, customerId])

    return (
        <div className="reservation-container" style={{ "marginTop": '100px' }}>
            <DateSelector
                startValue={startValue}
                endValue={endValue}
                setStartValue={setStartValue}
                setEndValue={setEndValue}
                blockedDates={blockedData}
            />
            <div className="summary-container">
                {room && nights ?
                    <ReservationSummary
                        nights={nights}
                        roomName={room?.roomType}
                        pricePerNight={room?.pricePerNight}
                        taxes={room?.taxRate}
                    />
                    :
                    <h1>Resumen de la reserva</h1>
                }
            </div>
            <div className="payform-container">
                <PaymentMethodForm
                    onSubmit={handleSubmit}
                    totalAmount={150}
                />
            </div>
            <h2>soy la habitación {roomId}</h2>
        </div>
    )
}