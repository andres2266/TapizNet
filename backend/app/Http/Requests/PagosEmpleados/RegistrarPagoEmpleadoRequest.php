<?php

namespace App\Http\Requests\PagosEmpleados;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RegistrarPagoEmpleadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        return $user && in_array($user->rol, ['administrador']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'metodo_pago' => [
                'required',
                'in:efectivo,transferencia,cheque,otro',
            ],

            'referencia_pago' => [
                'nullable',
                'string',
                'max:120',
            ],

            'notas' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'fecha_pago' => [
                'nullable',
                'date',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'metodo_pago.required' => 'El método de pago es obligatorio.',
            'metodo_pago.in' => 'El método de pago seleccionado no es válido.',

            'referencia_pago.max' => 'La referencia de pago no puede superar los 120 caracteres.',

            'notas.max' => 'Las notas no pueden superar los 1000 caracteres.',

            'fecha_pago.date' => 'La fecha de pago debe tener un formato válido.',
        ];
    }
}
