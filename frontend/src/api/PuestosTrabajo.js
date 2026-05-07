import { create } from "zustand";
import { api } from "./AxiosInstance";

export const PuestosTrabajo={
    
    create:async (data)=>{
       const response = await api.post('/puestos-trabajo',data)
       return response.data
    },
    
     view: async (params = {}) => {
        const response = await api.get("/puestos-trabajo", {
            params,
        });
        return response.data;
    }
    
}