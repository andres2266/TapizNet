<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Modelo extends Model
{
    protected $table = 'modelos';

    protected $fillable = ['empresa_id','nombre','descripcion','imagen_url','activo'];

    public function empresa(){

        return $this->belongsTo(Empresa::class);

    }

    public function procesosFabricacion()
{
    return $this->hasMany(ProcesoFabricacion::class, 'modelo_id');
}

 public function ordenesProduccion()
    {
        return $this->hasMany(OrdenProduccion::class, 'modelo_id');
    }

    public function unidadesFabricacion()
    {
        return $this->hasMany(UnidadFabricacion::class, 'modelo_id');
    }
}
