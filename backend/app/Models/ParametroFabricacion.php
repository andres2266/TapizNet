<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParametroFabricacion extends Model
{
    protected $table = 'parametros_fabricacion';

    protected $fillable = [
        'proceso_fabricacion_id',
        'nombre_parametro',
        'valor',
    ];

    public function procesoFabricacion()
    {
        return $this->belongsTo(ProcesoFabricacion::class,'proceso_fabricacion_id');
    }
}
