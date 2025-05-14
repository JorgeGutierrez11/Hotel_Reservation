import './ReservationSummary.css'

interface ReservationSummaryProps {
    nights: number;
    roomName: string;
    pricePerNight: number;
    taxes: number;
}

export const ReservationSummary = ({
    nights,
    roomName,
    pricePerNight,
    taxes
}: ReservationSummaryProps) => {
    return (
        <div className="reservation-summary">
            <h3 className="summary-title">Resumen de la reserva</h3>
            <p className="summary-subtitle">
                {nights} noche{nights > 1 ? 's' : ''} en habitación {roomName}
            </p>
            <hr />
            <div className="summary-row">
                <span>{pricePerNight} × {nights}</span> = <span>${pricePerNight * nights}</span>
            </div>
            <div className="summary-row">
                <span>Impuestos y tasas</span> <span>${taxes}</span>
            </div>
            <hr />
            <div className="summary-row total">
                <span>Total</span>
                <span>${ pricePerNight * nights + pricePerNight * nights * taxes}</span>
            </div>
        </div>
    );
};
