import { api } from "./AxiosInstance";

export const JornadasLaborales = {
    actual: async () => {
        const response = await api.get("/jornadas/actual");
        return response.data;
    },

    iniciar: async () => {
        const response = await api.post("/jornadas/iniciar");
        return response.data;
    },

    finalizar: async () => {
        const response = await api.post("/jornadas/finalizar");
        return response.data;
    },
};