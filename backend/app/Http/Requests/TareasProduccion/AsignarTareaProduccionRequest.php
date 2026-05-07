<?php

namespace App\Http\Requests\TareasProduccion;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AsignarTareaProduccionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
         $user = $this->user();

         return $user && in_array($user->rol, ['administrador', 'gestor']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'empleado_id' => [
                'required',
                'integer',
                'exists:empleados,id',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'empleado_id.required' => 'El empleado es obligatorio.',
            'empleado_id.integer' => 'El empleado debe ser válido.',
            'empleado_id.exists' => 'El empleado seleccionado no existe.',
        ];
    }
}
