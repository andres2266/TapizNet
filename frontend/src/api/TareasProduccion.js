import { api } from "./AxiosInstance";

export const TareasProduccion = {
    get: async (params = {}) => {
        const response = await api.get("/tareas-produccion", {
            params,
        });

        return response.data;
    },

    asignar: async (tareaId, data) => {
        const response = await api.post(`/tareas-produccion/${tareaId}/asignar`,data);
        return response.data;
    },

   disponibles: async (params = {}) => {
        const response = await api.get("/tareas-produccion/mis-disponibles", {
            params,
        });

        return response.data;
    },
    autoAsignar: async (tareaId) => {
        const response = await api.post(`/tareas-produccion/${tareaId}/auto-asignar`);
        return response.data;
    },

    terminar: async (tareaId, data = {}) => {
        const response = await api.patch(`/operario/tareas/${tareaId}/terminar`, data);
        return response.data;
    },
};