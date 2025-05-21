import { getHttpClient } from "./axios.service";

export const loginUser = async (email: string, password: string) => {
    const http = getHttpClient();
    
    try {
        const response = await http.post("/auth/login", { email, password });

        const { token } = response.data;

        if (!token) {
            throw new Error("Token no recibido desde el servidor.");
        }

        localStorage.setItem("token", token);

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            throw new Error("Credenciales inválidas. Verifica tu correo y contraseña.");
        }

        throw new Error("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
    }
};