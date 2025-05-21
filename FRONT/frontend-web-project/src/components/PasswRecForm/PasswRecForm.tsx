import React, {useState} from 'react';
import { recoverPassword } from '../../api/services/user.service';
import '../LogForm/CA.css';

interface Props {
    onSwitchForm: (form: 'login' | 'signup' | 'recover') => void;
}



const RecoverPasswordForm: React.FC<Props> = ({ onSwitchForm }) => {

    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { call } = recoverPassword(email);
            await call;

            alert('Se ha enviado un correo para recuperar la contraseña');
            onSwitchForm('login')

        } catch (error: any) {
            console.error('Error al recuperar contraseña:', error.response?.data || error.message);
            alert('Hubo un error al intentar recuperar la contraseña');
        }
    };

    return (
        <div className="containerlog">
            <div className="form-box">
                <div className="header">
                    <img src="logo.png" alt="Hotel Logo" className="logof" />
                    <h2>Recuperar contraseña</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Correo</label>
                    <input className="inputf"
                        type="email"
                        id="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn">Recuperar Contraseña</button>
                </form>
                <div className="separator"><hr />
                    <p>¿Ya tenienes una cuenta?</p>
                    <hr /></div>
                <button type="button" className="btn-secondary" onClick={() => onSwitchForm('login')}>
                    Volver al Login
                </button>

                <div className="separator">
                    <hr />
                    <p>¿Aún no tienes una cuenta?</p>
                    <hr />
                </div>

                <button type="button" className="btn-secondary" onClick={() => onSwitchForm('signup')}>
                    Crear Cuenta
                </button>
                <p className="terms">
                    Al continuar, aceptas los <a href="#">Términos de uso</a> y <a href="#">Políticas de privacidad</a>
                </p>
            </div>
        </div>
    );
};

export default RecoverPasswordForm;
