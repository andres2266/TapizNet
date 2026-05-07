<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PagoEmpleado extends Model
{
     protected $table = 'pagos_empleados';

    protected $fillable = [
        'empresa_id',
        'empleado_id',
        'fecha_pago',
        'monto_pagado',
        'saldo_anterior',
        'saldo_restante',
        'metodo_pago',
        'referencia_pago',
        'notas',
        'registrado_por',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'empresa_id');
    }

    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }

    public function registradoPor()
    {
        return $this->belongsTo(Empleado::class, 'registrado_por');
    }
}
