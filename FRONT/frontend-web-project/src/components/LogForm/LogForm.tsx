import React, { useState } from 'react';
import { loginUser } from "../../api/services/auth.service.ts";
import { useNavigate } from "react-router-dom";
import './CA.css';
import { getUserRoleFromToken } from '../../router/guards/PrivateGuard.tsx';
import { UseModalContext } from '../../context/modal.context.tsx';

interface Props {
    onSwitchForm: (form: 'login' | 'signup' | 'recover') => void;
}

const LoginForm: React.FC<Props> = ({ onSwitchForm }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);
    const navigate = useNavigate();
    const { setState } = UseModalContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginUser(email, password);

            const token = localStorage.getItem('token');
            const role = token ? getUserRoleFromToken(token) : null;

            if (role == "RECEPTIONIST") {
                navigate("/private/reception")
            } else if (role === "USER") {
                alert("¡¡Bienvenido!!");
            } else if(role === "ADMIN") {
                navigate("/private/reception");
            }else {
                alert("Role not found")
            }
            setState(false);
        } catch (err: any) {
            if (err.response?.status === 401) {
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
        <div className="login">
            <div className="login__form-box">
                <div className="login__header">
                    <img src="logo.png" alt="Hotel Logo" className="login__header-logo" />
                    <h2 className="login__header-title">Iniciar sesión</h2>
                </div>

                <form onSubmit={handleSubmit} className="login__form">
                    <label htmlFor="email" className="login__label">Correo</label>
                    <input
                        className="login__input"
                        type="email"
                        id="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className="login__label">Contraseña</label>
                    <div className="login__password-container">
                        <input
                            className="login__input"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`login__toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                            onClick={togglePassword}
                        ></i>
                    </div>

                    <button type="submit" className="login__btn">Iniciar Sesión</button>

                    <p className="login__terms">
                        Al continuar, aceptas los <a href="#">Términos de uso</a> y <a href="#">Políticas de privacidad</a>
                    </p>

                    <button type="button" className="login__forgot-password" onClick={() => onSwitchForm('recover')}>
                        ¿Olvidaste tu contraseña?
                    </button>
                </form>

                <div className="login__separator">
                    <hr />
                    <p>¿Aún no tienes una cuenta?</p>
                    <hr />
                </div>

                <button type="button" className="login__btn-secondary" onClick={() => onSwitchForm('signup')}>
                    Crear Cuenta
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
