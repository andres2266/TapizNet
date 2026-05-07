<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnidadFabricacion extends Model
{
    protected $table = 'unidades_fabricacion';

    protected $fillable = [
        'orden_produccion_id',
        'modelo_id',
        'numero_unidad',
        'estado',
        'fecha_inicio',
        'fecha_terminado',
        'observaciones',
    ];

    public function ordenProduccion()
    {
        return $this->belongsTo(OrdenProduccion::class, 'orden_produccion_id');
    }

    public function modelo()
    {
        return $this->belongsTo(Modelo::class, 'modelo_id');
    }

    public function tareasProduccion()
    {
        return $this->hasMany(TareaProduccion::class, 'unidad_fabricacion_id');
    }
}
