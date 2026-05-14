import { api } from "./AxiosInstance";;

export const PuestosTrabajo = {

    create: async (data) => {
        const response = await api.post('/puestos-trabajo', data)
        return response.data
    },

    view: async (params = {}) => {
        const response = await api.get("/puestos-trabajo/view", {
            params,
        });
        return response.data;
    },

    cambiarEstado: async (id, activo) => {
        return api.patch(`/puestos-trabajo/${id}/estado`, {
            activo,
        });
    },

    update: async (id, data) => {
        const response = await api.patch(`/puestos-trabajo/${id}/update`, data);
         return response.data
    },

    show: async (id) => {
       const response = await api.get(`/puestos-trabajo/${id}/show`);
        return response.data
    },



}