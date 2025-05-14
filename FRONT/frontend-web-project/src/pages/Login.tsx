import { useState } from "react";
import { loginUser } from "../api/services/auth.service";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
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
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>
    </form>
  );
};
