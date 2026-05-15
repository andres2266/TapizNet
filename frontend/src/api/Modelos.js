import { api } from "./AxiosInstance";

export const Modelos = {
    create: async (data) => {
        const response = await api.post("/modelos", data);
        return response.data;
    },
     view:async (params = {}) => {
        const response = await api.get("/modelos", { params });
        return response.data;
    },


    updateEstado: async (id, data) => {
        const response = await api.patch(`/modelos/${id}/estado`, data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.patch(`/modelos/${id}`, data);
        return response.data
    },

    show: async (id) => {
         const response = await api.get(`/modelos/${id}`);
         return response.data
    },

     statistics:async () => {
         const response = await api.get("/modelo/estadisticas");
         return response.data
    },
};