import { persist } from 'zustand/middleware';
import {create} from 'zustand';
export const authStore  = create(persist((set)=>({
    token: null,
    empleado: null,

    login:(empleado,token) => set({empleado,token}),
    logout: () => set({ empleado: null, token: null })
}),
{name:'auth-storage'}
))