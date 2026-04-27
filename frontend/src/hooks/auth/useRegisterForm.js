import { useForm } from "react-hook-form";
import {Auth} from '../../api/Auth'
import { authStore } from "../../stores/auth";
import { useNavigate } from "react-router-dom";
export function useRegisterForm(){
    const {register,handleSubmit,watch,formState: { errors,isSubmitting }} = useForm()
    const {login} = authStore()

    const registerPropietaio = async (data) =>{
       let response = await Auth.register(data);
       login(response.propietario,response.token)
       useNavigate('/')
    }

    return{
        register,
        handleSubmit,
        watch,
        errors,
        isSubmitting,
        registerPropietaio
    }
}