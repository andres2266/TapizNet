<?php

namespace App\Http\Requests\ProcesoFabricacion;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProcesoFabricacionRequest extends FormRequest
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
            'fases' => [
                'required',
                'array',
                'min:1',
            ],

            'fases.*.id' => [
                'required',
                'integer',
                'exists:procesos_fabricacion,id',
            ],

            'fases.*.puesto_trabajo_id' => [
                'sometimes',
                'required',
                'integer',
                'exists:puestos_trabajo,id',
            ],

            'fases.*.orden' => [
                'sometimes',
                'required',
                'integer',
                'min:1',
            ],

            'fases.*.nombre_tarea' => [
                'sometimes',
                'required',
                'string',
                'min:3',
                'max:100',
            ],

            'fases.*.descripcion' => [
                'sometimes',
                'nullable',
                'string',
                'max:500',
            ],

            'fases.*.tiempo_estimado_minutos' => [
                'sometimes',
                'required',
                'integer',
                'min:1',
                'max:10000',
            ],
            'fases.*.precio_destajo' => [
                'sometimes',
                'required',
                'numeric',
                'min:0',
                'max:9999.99',
            ],
            'fases.*.parametros' => [
                'sometimes',
                'array',
            ],

            'fases.*.parametros.*.id' => [
                'required',
                'integer',
                'exists:parametros_fabricacion,id',
            ],
            'fases.*.parametros.*.nombre' => [
                'sometimes',
                'nullable',
                'string',
                'max:100',
            ],



            'fases.*.parametros.*.valor' => [
                'sometimes',
                'nullable',
                'string',
                'max:255',
            ],
        ];
    }

    /**
     * Custom validation messages.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [


            'fases.required' => 'Debes enviar al menos una fase del proceso.',
            'fases.array' => 'Las fases deben enviarse en formato válido.',
            'fases.min' => 'El proceso debe tener al menos una fase.',



            'fases.*.id.required' => 'El identificador de la fase es obligatorio.',
            'fases.*.id.integer' => 'El identificador de la fase debe ser numérico.',
            'fases.*.id.exists' => 'La fase seleccionada no existe.',


            'fases.*.puesto_trabajo_id.required' => 'El puesto de trabajo es obligatorio.',
            'fases.*.puesto_trabajo_id.integer' => 'El puesto de trabajo debe ser numérico.',
            'fases.*.puesto_trabajo_id.exists' => 'El puesto de trabajo seleccionado no existe.',


            'fases.*.orden.required' => 'El orden de la fase es obligatorio.',
            'fases.*.orden.integer' => 'El orden debe ser un número entero.',
            'fases.*.orden.min' => 'El orden debe ser mayor o igual a 1.',


            'fases.*.nombre_tarea.required' => 'El nombre de la tarea es obligatorio.',
            'fases.*.nombre_tarea.string' => 'El nombre de la tarea debe ser texto.',
            'fases.*.nombre_tarea.min' => 'El nombre de la tarea debe tener al menos 3 caracteres.',
            'fases.*.nombre_tarea.max' => 'El nombre de la tarea no puede superar los 100 caracteres.',



            'fases.*.descripcion.string' => 'La descripción debe ser texto.',
            'fases.*.descripcion.max' => 'La descripción no puede superar los 500 caracteres.',


            'fases.*.tiempo_estimado_minutos.required' => 'El tiempo estimado es obligatorio.',
            'fases.*.tiempo_estimado_minutos.integer' => 'El tiempo estimado debe ser un número entero.',
            'fases.*.tiempo_estimado_minutos.min' => 'El tiempo estimado debe ser mayor a 0.',
            'fases.*.tiempo_estimado_minutos.max' => 'El tiempo estimado es demasiado grande.',


            'fases.*.precio_destajo.required' => 'El precio por destajo es obligatorio.',
            'fases.*.precio_destajo.numeric' => 'El precio por destajo debe ser numérico.',
            'fases.*.precio_destajo.min' => 'El precio por destajo no puede ser negativo.',
            'fases.*.precio_destajo.max' => 'El precio por destajo supera el límite permitido.',

            'fases.*.parametros.array' => 'Los parámetros deben enviarse en formato válido.',
            'fases.*.parametros.*.id.required' => 'El identificador del parámetro es obligatorio.',
            'fases.*.parametros.*.id.integer' => 'El identificador del parámetro debe ser numérico.',
            'fases.*.parametros.*.id.exists' => 'El parámetro seleccionado no existe.',


            'fases.*.parametros.*.nombre.string' => 'El nombre del parámetro debe ser texto.',
            'fases.*.parametros.*.nombre.max' => 'El nombre del parámetro no puede superar los 100 caracteres.',

            'fases.*.parametros.*.valor.string' => 'El valor del parámetro debe ser texto.',
            'fases.*.parametros.*.valor.max' => 'El valor del parámetro no puede superar los 255 caracteres.',
        ];
    }
}
