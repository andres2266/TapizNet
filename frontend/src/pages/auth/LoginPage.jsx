import React from 'react'
import { useLoginForm } from '../../hooks/useLoginForm';

export default function LoginPage() {
  const { register, handleSubmit, errors, loginTrabajador } = useLoginForm();
  return (
    <div>
      <form onSubmit={handleSubmit(loginTrabajador)}>
        <label>Nombre de usuario o email</label>
         <input 
        type="text" 
        {...register("usuario", {
           required: "El usuario es obligatorio.",
            minLength: {
                value: 3,
                message: "El usuario debe tener al menos 3 caracteres."
            },
            maxLength: {
                value: 50,
                message: "El usuario no puede superar los 50 caracteres."
            },
            pattern: {
                value: /^([^\s@]+@[^\s@]+\.[^\s@]+|[a-zA-Z0-9_.-]+)$/,
                message: "Ingresa un email válido o un nombre de usuario (3-50 caracteres)"
            }
        })} 
    />
    <p>{errors.usuario?.message}</p>

    <label>Contraseña</label>

    <input type="password"{...register("password", {
            required: "La contraseña es obligatoria.",
            minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres."
            },
            maxLength: {
                value: 100,
                message: "La contraseña no puede superar los 100 caracteres."
            },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: "Debe tener al menos una mayúscula, una minúscula y un número."
            }
        })}
    />
    <p>{errors.password?.message}</p>
    <button type='submit'>Login</button>
      </form>
    </div>
  )
}
