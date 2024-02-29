import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = "http://localhost:7777/api";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    }

    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers,
        withCredentials: true,
        ...config
    });

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status === 401) {
                removeToken();
                window.location.href = "/login";
                return;
            }
            // Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();