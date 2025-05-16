import './Input.css';

interface Props {
    name: string,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, type, value, onChange }: Props) => {
    return (
        <div className="container-input">
            <label className="label" htmlFor={name}>{name}</label>
            <input
                className="input"
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required />
        </div>
    );
}

