import React, { useState } from 'react';
import { createUser } from '../../api/services/user.service.ts';
import { UserRequest } from '../../models/userRec.model';
import { TypeDocument } from "../../models/typeDoc.enum.ts";
import './SignForm.css';


interface Props {
    onSwitchForm: (form: 'login' | 'signup' | 'recover') => void; // Prop para cambiar el formulario
    typeDocumentOptions: { value: TypeDocument; label: string }[]; // Opciones para el select de tipo de documento
}

const SignupForm: React.FC<Props> = ({ onSwitchForm, typeDocumentOptions }) => {
    /* const navigate = useNavigate(); */

    const [formData, setFormData] = useState<UserRequest>({
        name: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        typeDocument: TypeDocument.CC, // Valor inicial del tipo de documento
        numberDocument: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => setShowPassword((prev) => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        try {
            const { call } = createUser(formData);
            const response = await call;
            console.log('Cuenta creada:', response.data);

            // Redirección a /login después del registro
            onSwitchForm('login');
        } catch (error: any) {
            console.error('Error al crear cuenta:', error.response?.data || error.message);
            alert('Error al crear cuenta');
        }
    };
    return (
        <div className="containerlog">
            <div className="signup__form-box">
                <div className="signup__header">
                    <img src="logo.png" alt="Hotel Logo" className="signup__logo" />
                    <h2 className="signup__title">Crear cuenta</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        className="signup__input"
                        type="text"
                        id="name"
                        placeholder="Nombre(s)"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="lastName">Apellido</label>
                    <input
                        className="signup__input"
                        type="text"
                        id="lastname"
                        placeholder="Apellido(s)"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Correo</label>
                    <input
                        className="signup__input"
                        type="email"
                        id="email"
                        placeholder="Correo"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phoneNumber">Número de teléfono</label>
                    <input
                        className="signup__input"
                        type="tel"
                        id="phoneNumber"
                        placeholder="Número de teléfono"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="typeDocument">Tipo de Documento</label>
                    <select
                        className="signup__input"
                        id="typeDocument"
                        value={formData.typeDocument}
                        onChange={handleChange}
                        required
                    >
                        {typeDocumentOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="numberDocument">Número de Documento</label>
                    <input
                        className="signup__input"
                        type="text"
                        id="numberDocument"
                        placeholder="Número de documento"
                        value={formData.numberDocument}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Contraseña</label>
                    <div className="signup__password-container">
                        <input
                            className="signup__input"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <i
                            className={`signup__toggle-password fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'
                                }`}
                            onClick={togglePassword}
                        ></i>
                    </div>

                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <div className="signup__password-container">
                        <input
                            className="signup__input"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <i
                            className={`signup__toggle-password fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
                                }`}
                            onClick={toggleConfirmPassword}
                        ></i>
                    </div>

                    <button type="submit" className="signup__btn">
                        Crear Cuenta
                    </button>
                </form>

                <div className="signup__separator">
                    <hr className="signup__separator-line" />
                    <p>¿Ya tienes una cuenta?</p>
                    <hr className="signup__separator-line" />
                </div>

                <button type="button" className="signup__btn-secondary" onClick={() => onSwitchForm('login')}>
                    Iniciar Sesión
                </button>
                <p className="signup__terms">
                    Al continuar, aceptas los <a href="#">Términos de uso</a> y <a href="#">Políticas de privacidad</a>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;