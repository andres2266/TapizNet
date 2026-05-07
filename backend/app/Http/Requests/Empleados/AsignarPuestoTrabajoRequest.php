<?php

namespace App\Http\Requests\Empleados;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AsignarPuestoTrabajoRequest extends FormRequest
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
            'puesto_trabajo_id' => [
                'required',
                'integer',

                Rule::exists('puestos_de_trabajo', 'id')
                    ->where(function ($query) {
                        $query->where(
                            'empresa_id',
                            $this->user()->empresa_id
                        );
                    }),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'puesto_trabajo_id.required' =>
                'El puesto de trabajo es obligatorio.',

            'puesto_trabajo_id.integer' =>
                'El puesto de trabajo debe ser válido.',

            'puesto_trabajo_id.exists' =>
                'El puesto de trabajo seleccionado no existe.',
        ];
    }
}
