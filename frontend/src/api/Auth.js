import { api } from "./axiosInstance"

export const Auth = {
    register: async (data) => {
        const response = await api.post('/register', data);
        return response.data;
    },
    
    login: async (data) => {
        console.log(data)
        const response = await api.post('/login',data);
        return response.data;
    },
    
    logout: async () => {
        const response = await api.post('/logout');
        return response.data;
    },

    validationToken: () =>{}
};