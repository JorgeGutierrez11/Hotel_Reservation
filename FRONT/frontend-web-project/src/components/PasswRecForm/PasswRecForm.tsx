import React, { useState } from 'react';
import { recoverPassword } from '../../api/services/user.service';
import './PasswRecForm.css';

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
        <div className="recuperar">
            <div className="recuperar__form-box">
                <div className="recuperar__header">
                    <img src="logo.png" alt="Hotel Logo" className="recuperar__logo" />
                    <h2 className="recuperar__title">Recuperar contraseña</h2>
                </div>

                <form className="recuperar__form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="recuperar__label">Correo</label>
                    <input
                        className="recuperar__input"
                        type="email"
                        id="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className="recuperar__btn-primary">
                        Recuperar Contraseña
                    </button>
                </form>

                <div className="recuperar__separator">
                    <hr className="recuperar__line" />
                    <span className="recuperar__separator-text">¿Ya tienes una cuenta?</span>
                    <hr className="recuperar__line" />
                </div>

                <button
                    type="button"
                    className="recuperar__btn-secondary"
                    onClick={() => onSwitchForm('login')}
                >
                    Volver al Login
                </button>

                <div className="recuperar__separator">
                    <hr className="recuperar__line" />
                    <span className="recuperar__separator-text">¿Aún no tienes una cuenta?</span>
                    <hr className="recuperar__line" />
                </div>

                <button
                    type="button"
                    className="recuperar__btn-secondary"
                    onClick={() => onSwitchForm('signup')}
                >
                    Crear Cuenta
                </button>

                <p className="recuperar__terms">
                    Al continuar, aceptas los <a href="#">Términos de uso</a> y <a href="#">Políticas de privacidad</a>
                </p>
            </div>
        </div>
    );

};

export default RecoverPasswordForm;
