<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcesoFabricacion extends Model
{
    protected $table = 'procesos_fabricacion';

    protected $fillable = ['modelo_id','puesto_trabajo_id','orden','nombre_tarea','descripcion','tiempo_estimado_minutos','precio_destajo',];

    public function modelo()
    {
        return $this->belongsTo(Modelo::class,'modelo_id');
    }

    public function puestoTrabajo()
    {
        return $this->belongsTo(PuestoTrabajo::class,'puesto_trabajo_id');
    }

    public function parametrosFabricacion()
    {
        return $this->hasMany(ParametroFabricacion::class, 'proceso_fabricacion_id');
    }
    
    public function tareasProduccion()
    {
        return $this->hasMany(TareaProduccion::class, 'proceso_fabricacion_id');
    }
}
