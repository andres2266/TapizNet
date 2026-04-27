import { useForm } from "react-hook-form";
import { authStore } from "../../stores/auth";
import { Auth } from "../../api/Auth";
import { useNavigate } from "react-router-dom";

export function useLoginForm(){
    const {register,handleSubmit,formState: { errors }} = useForm();
    const {login} = authStore();

    const loginTrabajador = async(data) => {
        let response = await Auth.login(data);
        login(response.empleado,response.token);
        useNavigate('/');
    }
    return{
        register,
        handleSubmit,
        errors,
        loginTrabajador
    }
}