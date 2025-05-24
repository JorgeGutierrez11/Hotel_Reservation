import { useState } from "react";
import LoginForm from "../components/LogForm/LogForm.tsx";
import SignForm from "../components/SignForm/SignForm.tsx";
import RecoverPasswordForm from "../components/PasswRecForm/PasswRecForm.tsx";
import { TypeDocument } from '../models/typeDoc.enum';
const typeDocumentOptions = [
  { value: TypeDocument.CC, label: 'Cédula de Ciudadanía' },
  { value: TypeDocument.CE, label: 'Cédula de Extranjería' },
  { value: TypeDocument.PPP, label: 'Permiso por Protección Permanente' },
  { value: TypeDocument.PPT, label: 'Permiso por Protección Temporal' },
];
export const Login = () => {
  const [currentForm, setCurrentForm] = useState<'login' | 'signup' | 'recover'>('login'); // Estado para manejar el formulario actual

  // Función para cambiar el formulario actual
  const handleSwitchForm = (form: 'login' | 'signup' | 'recover') => {
    setCurrentForm(form);
  };

  return (
      <div>
        {/* Renderiza el formulario basado en el estado */}
        {currentForm === 'login' && <LoginForm onSwitchForm={handleSwitchForm} />}
        {currentForm === 'signup' && <SignForm onSwitchForm={handleSwitchForm} typeDocumentOptions={typeDocumentOptions}
        />}
        {currentForm === 'recover' && <RecoverPasswordForm onSwitchForm={handleSwitchForm} />}
      </div>
  );
};
