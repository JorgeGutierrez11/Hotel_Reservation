import "./RoomDetailsComponent.css";
import RoomImage from "./RoomImage";

/* Esto deberai se un Room pero esta sujeto a cambios */
interface RoomDetail {
  description: string;
  politicas: string[];
  comodidades: {
    icon: string;
    text: string;
  }[];
  image: string;
}

interface Props {
  roomDetails: RoomDetail;
}

function RoomDetailsComponent({ roomDetails }: Props) {

  return (
    <div className="container-info">
      <div className="description">
        <div className="details-content">
          <span>
            <h3>Descripción</h3>
            <p>{roomDetails.description}</p>

            <h3>Políticas</h3>
            <ul>
              {roomDetails.politicas.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </span>
          <RoomImage image={roomDetails.image}/>
        </div>

        <h3>Comodidades</h3>
        <ul className="amenities">
          {roomDetails.comodidades.map((item, index) => (
            <li key={index}>
              <span className="icon">{item.icon}</span> {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoomDetailsComponent;
