import { getHttpClient } from "./axios.service";

export const loginUser = async (email: string, password: string) => {
    const http = getHttpClient();

    console.log(`data: ${email} - ${password}`)
    const response = await http.post("/auth/login", { email, password });
    console.log(`esto esta mal? ${response}`)
    const { token } = response.data;

    localStorage.setItem("token", token);

    return response.data;
};