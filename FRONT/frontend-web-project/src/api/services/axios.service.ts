// src/services/httpService.ts
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

let axiosInstance: AxiosInstance;

const createAxios = (baseURL: string) => {
  axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log(`Request to: ${config.url}`);
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log(`Response from: ${response.config.url}`, {
        data: response.data,
        status: response.status,
      });
      return response;
    },
    (error) => {
      if (error.response) {
        console.error(`Error from: ${error.response.config.url}`);
      } else {
        console.error(`Error: ${error.message}`);
      }
      return Promise.reject(error);
    }
  );
};

export const initAxios = () => {
  createAxios("http://localhost:8080");
  setupInterceptors();
};

export const getHttpClient = (): AxiosInstance => {
  if (!axiosInstance) {
    throw new Error("Axios instance not initialized. Call initAxios() in main.tsx");
  }
  return axiosInstance;
};
