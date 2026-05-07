import { api } from "./AxiosInstance";


export const ProcesosFabricacion = {
    createByModelo: async (modeloId, data) => {
        const response = await api.post(
            `/modelos/${modeloId}/procesos-fabricacion`,
            data
        );

        return response.data;
    }
}