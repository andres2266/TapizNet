import { useForm } from "react-hook-form";
import { Empleados } from "../../api/Empleados";


export function useEmpleadoForm() {
  const {register,handleSubmit,formState: { errors, isSubmitting },reset,} = useForm();
  const crearTrabajador = async (data) => {
    
  let user = await Empleados.register(data)

   console.log(user);
    reset();
  
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    crearTrabajador,
  };
}