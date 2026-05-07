<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PuestoTrabajo extends Model
{
    protected $table = 'puestos_de_trabajo';
    
    protected $fillable = ['empresa_id','nombre'];

    public function empresa(){

        return $this->belongsTo(Empresa::class,'empresa_id');

    }

    public function empleados(){

        return $this->hasMany(Empleado::class, 'puesto_trabajo_id');

    }

    public function procesosFabricacion()
{
    return $this->hasMany(ProcesoFabricacion::class, 'puesto_trabajo_id');
}
public function tareasProduccion()
    {
        return $this->hasMany(TareaProduccion::class, 'puesto_trabajo_id');
    }
}
