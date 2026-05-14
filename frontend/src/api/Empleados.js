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

    empleadosDisponiblesParaTarea: async (puestoTrabajoId) => {
        const response = await api.get("/empleados", {
            params: {
                puesto_trabajo_id: puestoTrabajoId,
                rol: "operario",
                activo: 1,
                disponibles: 1,

            },
        })
        return response.data
    },

    update: async (id, data) => {
        const response = await api.put(`/empleados/${id}`, data);
        return response.data;
    },

    show: async (id) => {
        const response = await api.get(`/empleados/${id}`);

        return response.data
    },


    asignarPuestoTrabajo: async (empleadoId, data) => {
        const response = await api.patch(
            `/empleados/${empleadoId}/asignar-puesto`,
            data
        );

        return response.data;
    },

    updateEstado: async (id, activo) => {
    const response = await api.patch(`/empleados/${id}/estado`, {
        activo,
    });

    return response.data;
},
}
