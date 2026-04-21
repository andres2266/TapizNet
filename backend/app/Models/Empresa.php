<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'empresas';

    protected $fillable = [
        'nombre', 'email', 'direccion', 'telefono', 'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function empleados()
    {
        return $this->hasMany(Empleado::class, 'empresa_id');
    }
}
