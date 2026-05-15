<?php

namespace App\Http\Requests\Modelos;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateModeloRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();

        return in_array($user->rol, ['administrador', 'gestor']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nombre' => ['nullable', 'string', 'min:2', 'max:100'],
            'descripcion' => ['nullable', 'string', 'max:1000'],
            'activo' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'nombre.string' => 'El nombre del modelo debe ser un texto.',
            'nombre.min' => 'El nombre del modelo debe tener al menos 2 caracteres.',
            'nombre.max' => 'El nombre del modelo no puede superar los 100 caracteres.',

            'descripcion.string' => 'La descripción debe ser un texto.',
            'descripcion.max' => 'La descripción no puede superar los 1000 caracteres.',

            'activo.boolean' => 'El estado activo debe ser verdadero o falso.',
        ];
    }
}
