<?php


namespace App\Http\Requests\Empleados;
use Illuminate\Validation\Rule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateEmpleadoRequest extends FormRequest
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
        $empleadoId = $this->route('empleado');
        return [
             'usuario' => [
            'sometimes',
            'string',
            'max:50',
            'regex:/^[a-zA-Z0-9_]+$/',
            Rule::unique('empleados', 'usuario')->ignore($empleadoId),
        ],

        'email' => [
            'sometimes',
            'nullable',
            'email:rfc,dns',
            'max:255',
            Rule::unique('empleados', 'email')->ignore($empleadoId),
        ],

        'password' => [
            'sometimes',
            'nullable',
            'string',
            'min:8',
            'regex:/^(?=.*[A-Za-z])(?=.*\d).+$/',
        ],

        'nombre' => [
            'sometimes',
            'string',
            'max:100',
            'regex:/^[\pL\s]+$/u',
        ],

        'apellido' => [
            'sometimes',
            'nullable',
            'string',
            'max:100',
            'regex:/^[\pL\s]+$/u',
        ],

        'telefono' => [
            'sometimes',
            'nullable',
            'regex:/^[0-9+\-\s]{7,20}$/',
        ],

        'dni' => [
            'sometimes',
            'nullable',
            'regex:/^[0-9]{8}[A-Za-z]$/',
            Rule::unique('empleados', 'dni')->ignore($empleadoId),
        ],

        'tipo_contrato' => [
            'sometimes',
            Rule::in(['destajo', 'horas']),
        ],

        'precio_hora' => [
            'sometimes',
            'nullable',
            'numeric',
            'min:0',
        ],

        'saldo_pendiente' => [
            'sometimes',
            'nullable',
            'numeric',
            'min:0',
        ],

        'rol' => [
            'sometimes',
            Rule::in(['administrador', 'gestor', 'operario']),
        ],

        'activo' => [
            'sometimes',
            'boolean',
        ],
        ];
    }

    public function messages(): array
    {
        return [ 

        'usuario.string' => 'El usuario debe ser texto.',
        'usuario.max' => 'El usuario no puede tener más de 50 caracteres.',
        'usuario.regex' => 'El usuario solo puede contener letras, números y guiones bajos.',
        'usuario.unique' => 'Este usuario ya está en uso.',

        'email.email' => 'El email no tiene un formato válido.',
        'email.max' => 'El email no puede superar los 255 caracteres.',
        'email.unique' => 'Este email ya está registrado.',


        'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
        'password.regex' => 'La contraseña debe contener al menos una letra y un número.',

        'nombre.string' => 'El nombre debe ser texto.',
        'nombre.max' => 'El nombre no puede tener más de 100 caracteres.',
        'nombre.regex' => 'El nombre solo puede contener letras y espacios.',

        
        'apellido.string' => 'El apellido debe ser texto.',
        'apellido.max' => 'El apellido no puede tener más de 100 caracteres.',
        'apellido.regex' => 'El apellido solo puede contener letras y espacios.',

    
        'telefono.regex' => 'El teléfono solo puede contener números, espacios, + o - y debe tener entre 7 y 20 caracteres.',


        'dni.regex' => 'El DNI debe tener 8 números y una letra (ej: 12345678A).',
        'dni.unique' => 'Este DNI ya está registrado.',

        'tipo_contrato.in' => 'El tipo de contrato no es válido.',


        'precio_hora.numeric' => 'El precio por hora debe ser un número.',
        'precio_hora.min' => 'El precio por hora no puede ser negativo.',

      
        'saldo_pendiente.numeric' => 'El saldo debe ser un número.',
        'saldo_pendiente.min' => 'El saldo no puede ser negativo.',

       
        'rol.in' => 'El rol seleccionado no es válido.',

        
        'activo.boolean' => 'El campo activo debe ser verdadero o falso.',
        ];
    }
}
