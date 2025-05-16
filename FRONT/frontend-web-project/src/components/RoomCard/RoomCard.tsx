import { useNavigate } from 'react-router';
import './RoomCard.css';

type RoomCardProps = {
    id: number;
    image: string;
    roomType: string;
    description: string;
    pricePerNight: number;
    capacity: number;
};

export const RoomCard = ({ id, image, roomType, description, pricePerNight, capacity }: RoomCardProps) => {
    const navigate = useNavigate();

    const detailsButton = () => {
        navigate(`/roomDetails/${id}`);
    }
    return (
        <div className="room-card" onClick={detailsButton}>
            <img src={image} alt={roomType} className="room-image" />
            <div className="room-content">
                <span className="room-label">Room</span>
                <div className="room-half">
                    <h2>{roomType}</h2>
                    <span className="capacity">👤 {capacity}</span>
                </div>
                <p className="room-description">{description.slice(0, 120)}</p>
                <div className="room-footer">
                    <span>${pricePerNight}</span><small>/night</small>
                </div>
            </div>
        </div>
    );
};

