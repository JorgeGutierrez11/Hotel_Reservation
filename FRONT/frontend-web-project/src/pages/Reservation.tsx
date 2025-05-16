import { useParams } from 'react-router';
import { DateSelector } from '../components/Calendar/DateSelector';
import { useReservation } from '../hooks/useReservation';
import { ReservationSummary } from '../components/ReservationCards/ReservationSummary';
import { useEffect } from 'react';
import { PaymentMethodForm } from '../components/ReservationCards/PaymentMethodForm';
import './Reservation.css'
import calendar from '../assets/calendar2..png'
import repHabitacion from "../assets/habReparacion.png"
export const Reservation = () => {
    const { id } = useParams<{ id: string }>();
    const roomId = Number(id);

    const {
        setReservationData, startValue, endValue,
        setStartValue, setEndValue, handleSubmit,
        blockedData, room
    } = useReservation();

    const nights = endValue?.diff(startValue, 'day');

    useEffect(() => (
        setReservationData((prevData) => ({
            ...prevData,
            roomId: roomId
        }))
    ), [roomId])

    return (
        <div className="reservation-container">
            <div className="sumalendar-container">
                <DateSelector
                    startValue={startValue}
                    endValue={endValue}
                    setStartValue={setStartValue}
                    setEndValue={setEndValue}
                    blockedDates={blockedData}
                />
                <div className="summary-container">
                    {room && nights ?
                        room.roomStatus != "MAINTENANCE" ?
                            < ReservationSummary
                                nights={nights}
                                roomName={room?.roomType}
                                pricePerNight={room?.pricePerNight}
                                taxes={room?.taxRate}
                            />
                            :
                            <div className='calendar-image'>
                                <img src={repHabitacion} />
                            </div>
                        :
                        <div className='calendar-image'>
                            <img src={calendar} />
                        </div>
                    }
                </div>
            </div>
            <div className="payform-container">
                <PaymentMethodForm
                    onSubmit={handleSubmit}
                    roomStatus={room?.roomStatus}
                    endValue={endValue}
                    startValue={startValue}
                />
            </div>
            <h2>soy la habitación {roomId}</h2>
        </div>
    )
}