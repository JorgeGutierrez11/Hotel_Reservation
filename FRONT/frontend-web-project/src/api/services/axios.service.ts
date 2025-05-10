import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios"

let axiosInstance: AxiosInstance;

const createAxios = (baseURL: string) => {
    axiosInstance = axios.create({ baseURL });
}

const setupInterceptors = () => { // Se ejecuta en 2 ocaciones cuando recibimos request y cuando recibimos una response
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log(`Request made to: ${config.url}`);
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => {
            console.log(`Response from: ${response.config.url}`, {
                data: response.data,
                status: response.status
            });
            return response;
        }, (error) => {
            if (error.response) {
                console.error(`Error response from: ${error.response.config.url}`)
            } else {
                console.error(`Error ${error.message}`);
            }
            return Promise.reject(error);
        }
    )
}

export const initAxios = () => {
    createAxios("https://rickandmortyapi.com/api");
    setupInterceptors();
    return axiosInstance;
}
