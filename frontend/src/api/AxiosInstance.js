import axios from 'axios';
import { authStore } from '../stores/auth';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },

    
});

api.interceptors.request.use(
    (config) => {
        const token = authStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

