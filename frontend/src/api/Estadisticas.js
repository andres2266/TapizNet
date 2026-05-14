import { api } from "./AxiosInstance";

export const Estadisticas = {
    obtenerEstadisticasPagos: async () => {
        const response = await api.get("/estadisticas/pagos");
        return response.data;
    },

    obtenerEstadisticasTareas: async () => {
        const response = await api.get('/tareas/estadisticas');
        return response.data;
    },

    getPuestosStats: async () => {
        const response = await api.get('/puestos-trabajo/estadisticas');
        console.log(response.data)
        return response.data;
    },


};