<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JornadaLaboral extends Model
{
    protected $table = 'jornadas_laborales';

    protected $fillable = [
        'empresa_id',
        'empleado_id',
        'fecha',
        'hora_inicio',
        'hora_fin',
        'minutos_trabajados',
        'precio_hora',
        'total_ganado',
        'observaciones',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
}
