import { useEffect, useState } from "react";
import { Input } from "../general/Input";
import "./DataCard.css";
import { empyUser, User } from "../../models/client.model";
import { Reservation } from "../../models/reservation.model";

interface DataCardProps {
    userData: User;
    reservation: Reservation[];
}

function DataCard(/* { userData }: DataCardProps */) {
    const [copyFormData, setCopyFormData] = useState<User>(empyUser);
    const [formData, setFormData] = useState<User>(empyUser);

    const fields = [
        { name: "Nombre", type: "text" },
        { name: "Apellido", type: "text" },
        { name: "Documento", type: "text" },
        { name: "Correo", type: "email" },
        { name: "Teléfono", type: "text" },
        { name: "Contraseña", type: "password" },
    ];

    /* llamo a la api y seteo los datos del user */
/*     useEffect(() => {
        setFormData(userData);
        setCopyFormData(userData);
    }, [userData]) */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    /* Cargo los datos al back */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
    }

    const handleCancel = () => {
        setFormData(copyFormData);
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="container-data">
                <div className="data">
                    {fields.map(({ name, type }) => (
                        <Input
                            key={name}
                            name={name}
                            type={type}
                            value={"jiji " /* formData[name as keyof User] */} // Indicamos que name es clave válida
                            onChange={handleChange}
                        />
                    ))}
                </div>
            </div>
            <div className="data-buttons">
                <button className="button" id="undo" onClick={handleCancel}>Cancelar</button>
                <button className="button" id="save" type="submit">Guardar cambios</button>
            </div>
        </form>
    );
}

export default DataCard;