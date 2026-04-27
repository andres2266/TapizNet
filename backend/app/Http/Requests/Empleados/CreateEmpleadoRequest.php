<?php


namespace App\Http\Requests\Empleados;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
class CreateEmpleadoRequest extends FormRequest
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
    public function rules(): array
    {
        return [
             'usuario' => [
                'required',
                'string',
                'min:3',
                'max:30',
                'regex:/^[a-zA-Z0-9._-]+$/',
                'unique:empleados,usuario',
            ],

            'email' => [
                'nullable',
                'email:rfc,dns',
                'max:255',
                'unique:empleados,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'max:100',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ],

            'nombre' => [
                'required',
                'string',
                'min:2',
                'max:80',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            ],

            'apellido' => [
                'nullable',
                'string',
                'min:2',
                'max:80',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/u',
            ],

            'telefono' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^\+?[0-9\s\-]{7,20}$/',
            ],

            'dni' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[0-9A-Za-z\-]{5,20}$/',
                'unique:empleados,dni',
            ],

            'tipo_contrato' => [
                'required',
                'in:destajo,horas',
            ],

            'precio_hora' => [
                'nullable',
                'numeric',
                'min:0',
                'max:9999.99',
                'required_if:tipo_contrato,horas',
            ],

            'rol' => [
                'required',
                'in:gestor,administrador',
            ],

            'activo' => [
                'nullable',
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'usuario.required' => 'El usuario es obligatorio.',
            'usuario.min' => 'El usuario debe tener al menos 3 caracteres.',
            'usuario.max' => 'El usuario no puede superar los 30 caracteres.',
            'usuario.regex' => 'El usuario solo puede contener letras, números, puntos, guiones y guiones bajos.',
            'usuario.unique' => 'Este usuario ya está registrado.',

            'email.email' => 'El email debe tener un formato válido.',
            'email.unique' => 'Este email ya está registrado.',

            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'password.regex' => 'La contraseña debe tener al menos una mayúscula, una minúscula y un número.',

            'nombre.required' => 'El nombre es obligatorio.',
            'nombre.regex' => 'El nombre solo puede contener letras y espacios.',

            'apellido.regex' => 'El apellido solo puede contener letras y espacios.',

            'telefono.regex' => 'El teléfono debe tener un formato válido.',

            'dni.regex' => 'El DNI debe tener entre 5 y 20 caracteres y solo puede contener letras, números o guiones.',
            'dni.unique' => 'Este DNI ya está registrado.',

            'tipo_contrato.required' => 'El tipo de contrato es obligatorio.',
            'tipo_contrato.in' => 'El tipo de contrato debe ser destajo u horas.',

            'precio_hora.required_if' => 'El precio por hora es obligatorio si el contrato es por horas.',
            'precio_hora.numeric' => 'El precio por hora debe ser un número.',
            'precio_hora.min' => 'El precio por hora no puede ser negativo.',

            'rol.required' => 'El rol es obligatorio.',
            'rol.in' => 'El rol debe ser gestor u administrador.',
        ];
    }
}
