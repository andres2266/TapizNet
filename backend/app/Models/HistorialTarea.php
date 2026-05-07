<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistorialTarea extends Model
{
    protected $table = 'historial_tareas';

    protected $fillable = [
        'tarea_produccion_id',
        'empleado_id',
        'estado_anterior',
        'estado_nuevo',
        'observaciones',
        'fecha_cambio',
    ];

    public function tareaProduccion()
    {
        return $this->belongsTo(TareaProduccion::class, 'tarea_produccion_id');
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
}
