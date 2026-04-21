import React from 'react'
import { useRegisterForm} from '../../hooks/useRegisterForm'

export default function RegisterPage() {
    const {register,handleSubmit,watch,errors,registerPropietaio} = useRegisterForm()
  return (
<div>
    <form onSubmit={handleSubmit(registerPropietaio)}>
        <label>Nombre de la empresa</label>
        <input type="text"{...register("empresa_nombre", {
            required: "El nombre de la empresa es obligatorio.",
            minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres."
            },
            maxLength: {
                value: 255,
                message: "El nombre no puede superar los 255 caracteres."
            },
            pattern: {
                value: /^[\p{L}0-9\s\-\.&,]+$/u,
                message: "El nombre contiene caracteres no permitidos."
            }
        })}/>
      <p>{errors.empresa_nombre?.message}</p>

      <label>Correo de la empresa</label>

      <input type="email"{...register("empresa_email", {
            required: "El correo de la empresa es obligatorio.",
            maxLength: {
                value: 255,
                message: "El correo no puede superar los 255 caracteres."
            },
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "El formato del correo no es válido."
            }
        })}
    />
    <p>{errors.empresa_email?.message}</p>

     <label>Teléfono de la empresa </label>

     <input type="text"{...register("empresa_telefono", {
            pattern: {
                value: /^[+]?[0-9\s\-]{7,20}$/,
                message: "El formato del teléfono no es válido."
            }
        })}
    />
    <p>{errors.empresa_telefono?.message}</p>

    <label>Dirección de la empresa (opcional)</label>

    <input type="text"{...register("empresa_direccion", {
            maxLength: {
                value: 255,
                message: "La dirección no puede superar los 255 caracteres."
            }
        })}
    />
    <p>{errors.empresa_direccion?.message}</p>   

    <label>Nombre del propietario</label>

    <input type="text"{...register("nombre", {
            required: "El nombre es obligatorio.",
            minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres."
            },
            maxLength: {
                value: 255,
                message: "El nombre no puede superar los 255 caracteres."
            },
            pattern: {
                value: /^[\p{L}\s\-]+$/u,
                message: "El nombre solo puede contener letras y espacios."
            }
        })}
    />    
    <p>{errors.nombre?.message}</p>

    <label>Apellido (opcional)</label>
    <input type="text"{...register("apellido", {
            maxLength: {
                value: 255,
                message: "El apellido no puede superar los 255 caracteres."
            },
            pattern: {
                value: /^[\p{L}\s\-]+$/u,
                message: "El apellido solo puede contener letras y espacios."
            }
        })}
    />
    <p>{errors.apellido?.message}</p>

    <label>Nombre de usuario</label>
    <input type="text" {...register("usuario", {
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
                value: /^[a-zA-Z0-9_.-]+$/,
                message: "El usuario solo puede contener letras, números, puntos y guiones."
            }
        })} />
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

    <label>Confirmar contraseña</label>

    <input type="password"{...register("password_confirmation", {
        required: "Debes confirmar la contraseña.",
        validate: value =>value === watch("password") || "Las contraseñas no coinciden."})}/>

    <p>{errors.password_confirmation?.message}</p>

    <button type="submit">Registrar</button>
    </form> 
</div>
    
  )
}
