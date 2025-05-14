import { getHttpClient } from "./axios.service";

export const loginUser = async (email: string, password: string) => {
    const http = getHttpClient();

    const response = await http.post("/auth/login", { email, password });
    const { token } = response.data;

    localStorage.setItem("token", token);

    return response.data;
};