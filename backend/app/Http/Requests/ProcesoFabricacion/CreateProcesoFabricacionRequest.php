<?php

namespace App\Http\Requests\ProcesoFabricacion;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateProcesoFabricacionRequest extends FormRequest
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
            'fases' => [
                'required',
                'array',
                'min:1',
            ],

            'fases.*.puesto_trabajo_id' => [
                'required',
                'integer',
                'exists:puestos_de_trabajo,id',
            ],

            'fases.*.orden' => [
                'required',
                'integer',
                'min:1',
            ],

            'fases.*.nombre_tarea' => [
                'required',
                'string',
                'min:3',
                'max:120',
            ],

            'fases.*.descripcion' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'fases.*.tiempo_estimado_minutos' => [
                'required',
                'integer',
                'min:1',
                'max:10000',
            ],

            'fases.*.precio_destajo' => [
                'required',
                'numeric',
                'min:0',
                'max:999999.99',
            ],

            'fases.*.parametros' => [
                'nullable',
                'array',
            ],

            'fases.*.parametros.*.nombre' => [
                'required_with:fases.*.parametros',
                'string',
                'min:2',
                'max:120',
            ],

            'fases.*.parametros.*.valor' => [
                'required_with:fases.*.parametros',
                'string',
                'min:1',
                'max:500',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'fases.required' => 'Debes agregar al menos una fase al proceso de fabricación.',
            'fases.array' => 'Las fases deben enviarse en formato de lista.',
            'fases.min' => 'Debes agregar al menos una fase.',

            'fases.*.puesto_trabajo_id.required' => 'El puesto de trabajo es obligatorio en cada fase.',
            'fases.*.puesto_trabajo_id.exists' => 'El puesto de trabajo seleccionado no existe.',

            'fases.*.orden.required' => 'El orden de la fase es obligatorio.',
            'fases.*.orden.integer' => 'El orden debe ser un número entero.',
            'fases.*.orden.min' => 'El orden debe ser mayor o igual a 1.',

            'fases.*.nombre_tarea.required' => 'El nombre de la tarea es obligatorio.',
            'fases.*.nombre_tarea.min' => 'El nombre de la tarea debe tener al menos 3 caracteres.',
            'fases.*.nombre_tarea.max' => 'El nombre de la tarea no puede superar los 120 caracteres.',

            'fases.*.descripcion.max' => 'La descripción no puede superar los 1000 caracteres.',

            'fases.*.tiempo_estimado_minutos.required' => 'El tiempo estimado es obligatorio.',
            'fases.*.tiempo_estimado_minutos.integer' => 'El tiempo estimado debe ser un número entero.',
            'fases.*.tiempo_estimado_minutos.min' => 'El tiempo estimado debe ser mayor a 0 minutos.',

            'fases.*.precio_destajo.required' => 'El precio por destajo es obligatorio.',
            'fases.*.precio_destajo.numeric' => 'El precio por destajo debe ser un número.',
            'fases.*.precio_destajo.min' => 'El precio por destajo no puede ser negativo.',

            'fases.*.parametros.array' => 'Los parámetros deben enviarse en formato de lista.',

            'fases.*.parametros.*.nombre.required_with' => 'El nombre del parámetro es obligatorio.',
            'fases.*.parametros.*.nombre.min' => 'El nombre del parámetro debe tener al menos 2 caracteres.',
            'fases.*.parametros.*.nombre.max' => 'El nombre del parámetro no puede superar los 120 caracteres.',

            'fases.*.parametros.*.valor.required_with' => 'El valor del parámetro es obligatorio.',
            'fases.*.parametros.*.valor.max' => 'El valor del parámetro no puede superar los 500 caracteres.',
        ];
    }
}
