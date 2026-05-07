<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TareaProduccion extends Model
{
     protected $table = 'tareas_produccion';

    protected $fillable = [
        'empresa_id',
        'orden_produccion_id',
        'unidad_fabricacion_id',
        'proceso_fabricacion_id',
        'puesto_trabajo_id',
        'trabajador_id',
        'asignado_por',
        'orden',
        'nombre_tarea',
        'descripcion',
        'estado',
        'fecha_asignacion',
        'hora_inicio',
        'hora_fin',
        'tiempo_estimado_minutos',
        'tiempo_real_minutos',
        'ganancia_destajo',
        'comentarios',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function ordenProduccion()
    {
        return $this->belongsTo(OrdenProduccion::class, 'orden_produccion_id');
    }

    public function unidadFabricacion()
    {
        return $this->belongsTo(UnidadFabricacion::class, 'unidad_fabricacion_id');
    }

    public function procesoFabricacion()
    {
        return $this->belongsTo(ProcesoFabricacion::class, 'proceso_fabricacion_id');
    }

    public function puestoTrabajo()
    {
        return $this->belongsTo(PuestoTrabajo::class, 'puesto_trabajo_id');
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'trabajador_id');
    }

    public function asignador()
    {
        return $this->belongsTo(Empleado::class, 'asignado_por');
    }

    public function historial()
    {
        return $this->hasMany(HistorialTarea::class, 'tarea_produccion_id');
    }

    public function registroGanancia()
    {
        return $this->hasOne(RegistroGanancia::class, 'tarea_produccion_id');
    }
}
