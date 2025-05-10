import './RoomCard.css';

type RoomCardProps = {
    image: string;
    roomType: string;
    description: string;
    pricePerNight: number;
    capacity: number;
};

export const RoomCard = ({ image, roomType, description, pricePerNight, capacity }: RoomCardProps) => {
    const text = `jorge leinias dlfaksjdf aldkjfa df jorge leinias dlfaksjdf aldkjfa dfjorge leinias jorge leinias dlfaksjdf aldkjfa df${description}`
    return (
        <div className="room-card">
            <img src={image} alt={roomType} className="room-image" />
            <div className="room-content">
                <span className="room-label">Room</span>
                <div className="room-half">
                    <h2>{roomType}</h2>
                    <span className="capacity">👤 {capacity}</span>
                </div>
                <p className="room-description">{text.slice(0, 120)}</p>
                <div className="room-footer">
                    <span>${pricePerNight}</span><small>/night</small>
                </div>
            </div>
        </div>
    );
};

