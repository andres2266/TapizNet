<?php

namespace App\Http\Controllers;

use App\Http\Requests\PagosEmpleados\RegistrarPagoEmpleadoRequest;
use App\Models\Empleado;
use App\Models\PagoEmpleado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PagoEmpleadoController extends Controller
{
    public function registrar(RegistrarPagoEmpleadoRequest $request,Empleado $empleadoId) {
        $usuario = $request->user();

        return DB::transaction(function () use ($request, $usuario, $empleadoId) {

            $empleado = Empleado::where('empresa_id', $usuario->empresa_id)
                ->where('id', $empleadoId)
                ->where('saldo_pendiente', '>', 0)
                ->lockForUpdate()
                ->first();

            if (!$empleado) {
                return response()->json([
                    'message' => 'El empleado no existe o no tiene saldo pendiente.',
                ], 404);
            }

            $saldoAnterior = $empleado->saldo_pendiente;

            $montoPagado = $saldoAnterior;

            $pago = PagoEmpleado::create([
                'empresa_id' => $usuario->empresa_id,
                'empleado_id' => $empleado->id,

                'fecha_pago' => $request->fecha_pago ?? now()->toDateString(),

                'monto_pagado' => $montoPagado,

                'saldo_anterior' => $saldoAnterior,

                'saldo_restante' => 0,

                'metodo_pago' => $request->metodo_pago,

                'referencia_pago' => $request->referencia_pago,

                'notas' => $request->notas,

                'registrado_por' => $usuario->id,
            ]);

            $empleado->update([
                'saldo_pendiente' => 0,
            ]);

            return response()->json([
                'message' => 'Pago registrado correctamente.',
                'data' => [
                    'pago' => $pago,
                    'empleado' => $empleado->fresh(),
                ],
            ], 201);
        });
    }
}
