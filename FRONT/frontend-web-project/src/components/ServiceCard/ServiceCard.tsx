import './ServiceCard.css';

type ServiceCardProps = {
    id: number;
    image: string;
    title: string;
};

export const ServiceCard = ({ image, title, id }: ServiceCardProps) => {
    return (
        <div className={`service-card-${id}`}>
            <img src={image} alt={title} className="service-image" />
            <div className="service-title">{title}</div>
        </div>
    );
};
