<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresas';

    protected $fillable = [
        'nombre',
        'email',
        'direccion',
        'telefono',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function empleados(){
        return $this->hasMany(Empleado::class, 'empresa_id');
    }

    public function puestosTrabajo(){
        return $this->hasMany(PuestoTrabajo::class, 'empresa_id');
    }

    public function modelos(){
        return $this->hasMany(Modelo::class, 'empresa_id');
    }

     public function ordenesProduccion()
    {
        return $this->hasMany(OrdenProduccion::class, 'empresa_id');
    }

    // ✅ CORRECTO - Usa la misma columna que belongsTo
public function tareasProduccion()
{
    return $this->hasMany(TareaProduccion::class, 'trabajador_id', 'id');
}

    public function registroGanancias()
    {
        return $this->hasMany(RegistroGanancia::class, 'empresa_id');
    }

    public function jornadasLaborales()
    {
        return $this->hasMany(JornadaLaboral::class, 'empresa_id');
    }

    public function pagosEmpleados()
    {
        return $this->hasMany(PagoEmpleado::class, 'empresa_id');
    }
}
