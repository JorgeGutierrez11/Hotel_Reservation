import { Input } from "../general/Input";
import "./DataCard.css";

function DataCard() {

    const handleSubmit = (e: any) => {
        e.preventDefault();
    }

    const ejemplo = [
        { name: "Nombre", type: "text" },
        { name: "Apellido", type: "text" },
        { name: "Documento", type: "number" },
        { name: "Correo", type: "email" },
        { name: "Teléfono", type: "number" },
        { name: "Contraseña", type: "password" }
    ]

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="container-data">
                <div className="data">
                    {ejemplo.map((prev) => (
                        <Input name={prev.name} type={prev.type} />
                    ))}
                </div>
            </div>
            <div className="buttons">
                <button className="button" id="undo">Cancelar</button>
                <button className="button" id="save" >Guardar cambios</button>
            </div>
        </form>
    );
}

export default DataCard;