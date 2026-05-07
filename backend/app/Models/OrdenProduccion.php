<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrdenProduccion extends Model
{

    protected $table = 'ordenes_produccion';

    protected $fillable = [
        'empresa_id',
        'modelo_id',
        'codigo',
        'cantidad',
        'estado',
        'prioridad',
        'notas',
        'creado_por',
        'fecha_inicio',
        'fecha_finalizacion',
    ];

     public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function modelo()
    {
        return $this->belongsTo(Modelo::class, 'modelo_id');
    }

    public function creador()
    {
        return $this->belongsTo(Empleado::class, 'creado_por');
    }

    public function unidadesFabricacion()
    {
        return $this->hasMany(UnidadFabricacion::class, 'orden_produccion_id');
    }

    public function tareasProduccion()
    {
        return $this->hasMany(TareaProduccion::class, 'orden_produccion_id');
    }


    public static function generarCodigo(): string
{
    $year = now()->year;

    $ultimoId = self::max('id') + 1;

    return 'OP-' . $year . '-' . str_pad($ultimoId, 5, '0', STR_PAD_LEFT);
}
}
