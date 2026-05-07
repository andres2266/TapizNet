<?php


namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Empleado extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'empleados';

    protected $fillable = [
        'empresa_id',
        'puesto_trabajo_id',
        'usuario',
        'password',
        'nombre',
        'apellido',
        'telefono',
        'dni',
        'tipo_contrato',
        'precio_hora',
        'saldo_pendiente',
        'rol',
        'activo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'activo'          => 'boolean',
        'precio_hora'     => 'decimal:2',
        'saldo_pendiente' => 'decimal:2',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function puestoTrabajo()
    {

        return $this->belongsTo(PuestoTrabajo::class, 'puesto_trabajo_id');
    }

    public function ordenesProduccionCreadas()
    {
        return $this->hasMany(OrdenProduccion::class, 'creado_por');
    }

    public function tareasProduccion()
    {
        return $this->hasMany(TareaProduccion::class, 'trabajador_id');
    }

    public function tareasAsignadasPorMi()
    {
        return $this->hasMany(TareaProduccion::class, 'asignado_por');
    }

    public function historialTareas()
    {
        return $this->hasMany(HistorialTarea::class, 'empleado_id');
    }

    public function registroGanancias()
    {
        return $this->hasMany(RegistroGanancia::class, 'empleado_id');
    }

    public function jornadasLaborales()
    {
        return $this->hasMany(JornadaLaboral::class, 'empleado_id');
    }

    public function pagosRecibidos()
    {
        return $this->hasMany(PagoEmpleado::class, 'empleado_id');
    }

    public function pagosRegistrados()
    {
        return $this->hasMany(PagoEmpleado::class, 'registrado_por');
    }
}
