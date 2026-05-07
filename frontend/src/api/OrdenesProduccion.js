import { api } from "./AxiosInstance";

export const OrdenesProduccion = {
    create: async (data) => {
        const response = await api.post("/ordenes-produccion", data);
        return response.data;
    },
};