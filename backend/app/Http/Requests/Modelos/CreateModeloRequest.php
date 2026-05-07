<?php

namespace App\Http\Requests\Modelos;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateModeloRequest extends FormRequest
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
            'nombre' => [
                'required',
                'string',
                'min:2',
                'max:120',
                Rule::unique('modelos', 'nombre')->where('empresa_id', $this->user()->empresa_id),
            ],

            'descripcion' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'imagen_url' => [
                'nullable',
                'string',
                'max:255',
                'url',
            ],
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El nombre del modelo es obligatorio.',
            'nombre.min' => 'El nombre debe tener al menos 2 caracteres.',
            'nombre.max' => 'El nombre no puede superar los 120 caracteres.',
            'nombre.unique' => 'Ya existe un modelo con este nombre en tu empresa.',

            'descripcion.string' => 'La descripción debe ser texto.',
            'descripcion.max' => 'La descripción no puede superar los 1000 caracteres.',

            'imagen_url.url' => 'La imagen debe ser una URL válida.',
            'imagen_url.max' => 'La URL de la imagen no puede superar los 255 caracteres.',
        ];
    }
}
