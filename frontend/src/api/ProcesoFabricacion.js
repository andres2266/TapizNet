import { api } from "./AxiosInstance";


export const ProcesosFabricacion = {
    createByModelo: async (modeloId, data) => {
        const response = await api.post(
            `/modelos/${modeloId}/procesos-fabricacion`,
            data
        );

        return response.data;
    },

    showByModelo: async (modeloId) => {
        const response = await api.get(
            `/modelos/${modeloId}/proceso-fabricacion`
        );

        return response.data;
    },

    updateByModelo: async (modeloId, data) => {
        const response = await api.patch(
            `/modelos/${modeloId}/proceso-fabricacion`,
            data
        );

        return response.data;
    },

}