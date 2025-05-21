// src/services/httpService.ts
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

let axiosInstance: AxiosInstance;

const createAxios = (baseURL: string) => {
  axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': true
  },  
    withCredentials: false 
  });
};

const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      
      if (config.method?.toUpperCase() === "OPTIONS") {
        config.headers["Access-Control-Request-Method"] = "*"; 
      }
      
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`Request to: ${config.url}`, config.headers);
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`Response from: ${response.config.url}`, {
        data: response.data,
        status: response.status,
        headers: response.headers 
      });
      return response;
    },
    (error) => {
      if (error.response) {
        console.error(`Error from: ${error.response.config.url}`, {
          status: error.response.status,
          headers: error.response.headers 
        });
      }
      return Promise.reject(error);
    }
  );
};

// Inicialización (debe ejecutarse al cargar la app)
export const initAxios = () => {
  createAxios("http://localhost:8080");
  setupInterceptors();
};

export const getHttpClient = (): AxiosInstance => {
  if (!axiosInstance) {
    initAxios();
  }
  return axiosInstance!;
};