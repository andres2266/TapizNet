<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegistroGanancia extends Model
{
     protected $table = 'registro_ganancias';

    protected $fillable = [
        'empresa_id',
        'tarea_produccion_id',
        'empleado_id',
        'fecha',
        'cantidad_ganada',
        'descripcion',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function tareaProduccion()
    {
        return $this->belongsTo(TareaProduccion::class, 'tarea_produccion_id');
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
}
