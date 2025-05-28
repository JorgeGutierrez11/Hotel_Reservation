import { useState } from "react";
import { Input } from "../general/Input";
import "./DataCard.css";
import { Client, empyUser } from "../../models/client.model";

interface Props {
    userData: Client
}

type ClientField = {
    name: string;
    type: string;
    infName: keyof Client ; 
  };
  
function DataCard({ userData }: Props) {

    const [copyFormData, setCopyFormData] = useState<Client>(empyUser);
    const [formData, setFormData] = useState<Client>(empyUser);
    
    const fields: ClientField[] = [
        { name: "Nombre", type: "text" , infName: "name"},
        { name: "Apellido", type: "text", infName: "lastname"},
        { name: "Documento", type: "text", infName: "numberDocument"},
        { name: "Correo", type: "email", infName: "email"},
        { name: "Teléfono", type: "text", infName: "phoneNumber"},
        { name: "Contraseña", type: "password", infName: "password"},
    ];

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
                    {fields.map(({ name, type, infName }) => (
                        <Input
                            key={infName}
                            name={name}
                            type={type}
                            value={String(userData[infName] || "")} 
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