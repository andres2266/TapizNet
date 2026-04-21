import { useForm } from "react-hook-form";
import {Auth} from '../api/Auth'
import { authStore } from "../stores/auth";
export function useRegisterForm(){
    const {register,handleSubmit,watch,formState: { errors }} = useForm()
    const {login} = authStore()

    const registerPropietaio = async (data) =>{
       let response = await Auth.register(data);
       login(response.propietario,response.token)
    }

    return{
        register,
        handleSubmit,
        watch,
        errors,
        registerPropietaio
    }
}