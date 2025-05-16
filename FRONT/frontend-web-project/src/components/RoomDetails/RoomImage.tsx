import "./RoomImage.css";

interface Props {
  image: string
}

function RoomImage({ image }: Props) {
  return (
    <div className="container-room-image">
      <img src={image} alt="Room image to descrption" />
    </div>
  );
}

export default RoomImage;
