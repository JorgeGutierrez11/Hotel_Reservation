import './Input.css';

interface Props {
    name: string, 
    type: string
}

export const Input = ({name, type}: Props) => {
    return(
        <div className="container-input">
            <label className="label" htmlFor={name}>{name}</label>
            <input className="input" type={type} id={name} />
        </div>
    );
}

