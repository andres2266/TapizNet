import axios from "axios";
import { authStore } from "../stores/auth";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        "Content-Type": "application/json",
    },
});

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = authStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default AxiosInstance;
