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
        'empresa_id', 'usuario', 'password', 'nombre', 'apellido',
        'telefono', 'dni', 'tipo_contrato', 'precio_hora',
        'saldo_pendiente', 'rol', 'activo',
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
}

