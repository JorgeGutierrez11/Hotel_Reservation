import React, { useState } from 'react';
import { loginUser } from "../../api/services/auth.service.ts";
import './CA.css';
import {useNavigate} from "react-router-dom";





interface Props {
    onSwitchForm: (form: 'login' | 'signup' | 'recover') => void; // Prop para cambiar el formulario
}


const LoginForm: React.FC<Props> =  ({ onSwitchForm }) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const togglePassword = () => setShowPassword(prev => !prev);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate("/private/dashboard");
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                alert("Credenciales incorrectas");
            } else if (err.message === "Network Error") {
                alert("Error de red: Verifica tu conexión o el backend");
            } else {
                alert("Ocurrió un error inesperado");
                console.error("Login error:", err);
            }
        }

    };


    return (
        <div className="containerlog">
            <div className="form-box">
                <div className="header">
                    <img src="logo.png" alt="Hotel Logo" className="logof" />
                    <h2 className={"h2"}>Iniciar sesión</h2>
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

                    <label htmlFor="password">Contraseña</label>
                    <div className="password-container">
                        <input className="inputf"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={togglePassword}
                        ></i>
                    </div>

                    <button type="submit" className="btn">Iniciar Sesión</button>

                    <p className="terms">
                        Al continuar, aceptas los <a href="#">Términos de uso</a> y <a href="#">Políticas de privacidad</a>
                    </p>
                    <button type="button" className="forgot-password" onClick={() => onSwitchForm('recover')}>
                    ¿Olvidaste tu contraseña?
                    </button>

                </form>

                <div className="separator">
                    <hr />
                    <p>¿Aún no tienes una cuenta?</p>
                    <hr />
                </div>

                <button type="button" className="btn-secondary" onClick={() => onSwitchForm('signup')}>
                Crear Cuenta
                </button>

            </div>
        </div>
    );
};

export default LoginForm;
