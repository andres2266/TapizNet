<?php

namespace App\Http\Controllers;

use App\Models\JornadaLaboral;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JornadaLaboralController extends Controller
{


    public function actual(Request $request)
    {
        $empleado = $request->user();
        if ($empleado->tipo_contrato !== 'horas') {
            return response()->json(['message' => 'Solo los empleados por horas pueden consultar jornada.', 'data' => null,], 403);
        }
        $jornada = JornadaLaboral::where('empresa_id', $empleado->empresa_id)->where('empleado_id', $empleado->id)->whereNull('hora_fin')->latest('hora_inicio')->first();
        return response()->json(['message' => $jornada ? 'Jornada activa encontrada.' : 'No hay jornada activa.', 'data' => $jornada,]);
    }





    public function iniciar(Request $request)
    {
        $empleado = $request->user();
        if ($empleado->tipo_contrato !== 'horas') {
            return response()->json(['message' => 'Solo los empleados por horas pueden iniciar jornada.',], 403);
        }
        if (!$empleado->precio_hora || $empleado->precio_hora <= 0) {
            return response()->json(['message' => 'No tienes un precio por hora configurado.',], 422);
        }
        $jornadaAbierta = JornadaLaboral::where('empresa_id', $empleado->empresa_id)->where('empleado_id', $empleado->id)->whereNull('hora_fin')->exists();
        if ($jornadaAbierta) {
            return response()->json(['message' => 'Ya tienes una jornada iniciada.',], 422);
        }
        $jornada = JornadaLaboral::create(['empresa_id' => $empleado->empresa_id, 'empleado_id' => $empleado->id, 'fecha' => now()->toDateString(), 'hora_inicio' => now(), 'hora_fin' => null, 'minutos_trabajados' => null, 'precio_hora' => $empleado->precio_hora, 'total_ganado' => null,]);
        return response()->json(['message' => 'Jornada iniciada correctamente.', 'data' => $jornada,], 201);
    }





    public function finalizar(Request $request)
    {
        $empleado = $request->user();
        if ($empleado->tipo_contrato !== 'horas') {
            return response()->json(['message' => 'Solo los empleados por horas pueden finalizar jornada.',], 403);
        }
        return DB::transaction(function () use ($empleado) {
            $jornada = JornadaLaboral::where('empresa_id', $empleado->empresa_id)->where('empleado_id', $empleado->id)->whereNull('hora_fin')->lockForUpdate()->first();
            if (!$jornada) {
                return response()->json(['message' => 'No tienes una jornada activa para finalizar.',], 422);
            }
            $horaFin = now();
            $minutosTrabajados = $jornada->hora_inicio->diffInMinutes($horaFin);
            $totalGanado = round(($minutosTrabajados / 60) * $jornada->precio_hora, 2);
            $jornada->update(['hora_fin' => $horaFin, 'minutos_trabajados' => $minutosTrabajados, 'total_ganado' => $totalGanado,]);
            $empleado->increment('saldo_pendiente', $totalGanado);
            return response()->json(['message' => 'Jornada finalizada correctamente.', 'data' => $jornada->fresh(),]);
        });
    }
}
