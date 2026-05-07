<?php

namespace App\Http\Requests\OrdenesProduccion;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateOrdenProduccionRequest extends FormRequest
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
            'modelo_id' => [
                'required',
                'integer',
                'exists:modelos,id',
            ],

            'cantidad' => [
                'required',
                'integer',
                'min:1',
                'max:500',
            ],

            'prioridad' => [
                'required',
                'string',
                'in:baja,normal,alta,urgente',
            ],

            'fecha_entrega_estimada' => [
                'nullable',
                'date',
                'after_or_equal:today',
            ],

            'notas' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'modelo_id.required' => 'El modelo es obligatorio.',
            'modelo_id.exists' => 'El modelo seleccionado no existe.',

            'cantidad.required' => 'La cantidad es obligatoria.',
            'cantidad.integer' => 'La cantidad debe ser un número entero.',
            'cantidad.min' => 'La cantidad mínima debe ser 1.',
            'cantidad.max' => 'La cantidad no puede superar 500 unidades por orden.',

            'prioridad.required' => 'La prioridad es obligatoria.',
            'prioridad.in' => 'La prioridad debe ser baja, normal, alta o urgente.',

            'fecha_entrega_estimada.date' => 'La fecha de entrega debe tener un formato válido.',
            'fecha_entrega_estimada.after_or_equal' => 'La fecha de entrega no puede ser anterior a hoy.',

            'notas.max' => 'Las notas no pueden superar los 1000 caracteres.',
        ];
    }
}
