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
};