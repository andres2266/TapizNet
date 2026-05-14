import { api } from "./AxiosInstance";

export const PagosEmpleados = {

    registrar: async (empleadoId, data) => {
        const response = await api.post(`/pagos-empleados/${empleadoId}/registrar`,data);
        return response.data;
    },

    pendientes: async () => {
        const response = await api.get("/pagos-empleados/pendientes");
        return response.data;
    },
    

};