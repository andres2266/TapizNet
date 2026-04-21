<?php

namespace App\Http\Requests\Auth;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegistroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array{
        return [
            // Datos de Empresa
          'empresa_nombre' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[\p{L}0-9\s\-\.&,]+$/u',  // letras unicode, números, espacios y símbolos comunes
            ],
            'empresa_email' => [
                'required',
                'email',
                'max:255',
                'unique:empresas,email',   // ← plural
],
            'empresa_telefono' => [
                'nullable',
                'string',
                'regex:/^[+]?[0-9\s\-]{7,20}$/', // formato internacional o nacional
            ],
            'empresa_direccion' => [
                'nullable',
                'string',
                'max:255',
            ],
            
            //Datos de Propietario

            'nombre' => [
                'required',
                'string',
                'min:2',
                'max:255',
                'regex:/^[\p{L}\s\-]+$/u', // solo letras unicode y espacios (admite acentos)
            ],
            'apellido' => [
                'nullable',
                'string',
                'max:255',
                'regex:/^[\p{L}\s\-]+$/u',
            ],
            'usuario' => [
                'required',
                'string',
                'min:3',
                'max:50',
                'unique:empleados,usuario',
                'regex:/^[a-zA-Z0-9_.-]+$/', // sin espacios ni caracteres especiales
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:100',
                'confirmed',                  // busca password_confirmation en el request
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/', // al menos 1 mayúscula, 1 minúscula, 1 número
            ],

        ];
    }


    public function messages(): array{
        return [
            // Empresa
            'empresa_nombre.required'  => 'El nombre de la empresa es obligatorio.',
            'empresa_nombre.min'       => 'El nombre debe tener al menos 2 caracteres.',
            'empresa_nombre.regex'     => 'El nombre contiene caracteres no permitidos.',
            'empresa_email.required'   => 'El correo de la empresa es obligatorio.',
            'empresa_email.email'      => 'El formato del correo no es válido.',
            'empresa_email.unique'     => 'Este correo ya está registrado.',
            'empresa_telefono.regex'   => 'El formato del teléfono no es válido.',

            // Propietario
            'nombre.required'          => 'El nombre es obligatorio.',
            'nombre.regex'             => 'El nombre solo puede contener letras y espacios.',
            'usuario.required'         => 'El usuario es obligatorio.',
            'usuario.min'              => 'El usuario debe tener al menos 3 caracteres.',
            'usuario.unique'           => 'Este nombre de usuario ya está en uso.',
            'usuario.regex'            => 'El usuario solo puede contener letras, números, puntos y guiones.',
            'password.required'        => 'La contraseña es obligatoria.',
            'password.min'             => 'La contraseña debe tener al menos 8 caracteres.',
            'password.confirmed'       => 'Las contraseñas no coinciden.',
            'password.regex'           => 'La contraseña debe tener al menos una mayúscula, una minúscula y un número.',
        ];
    }
}
