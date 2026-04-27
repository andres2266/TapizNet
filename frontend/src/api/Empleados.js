import { api } from "./AxiosInstance";

export const Empleados = {
    register: async (data) => {
        const response = await api.post('/empleados', data);
        return response.data;
    },

    view: async (params = {}) => {
        const response = await api.get("/empleados", { params });
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/empleados/${id}`, data);
        return response.data;
    },

    show: async (id)=>{
         const response = await api.get(`/empleados/${id}`);
         return response.data
    }
}
