<?php

namespace App\Http\Controllers;

use App\Models\PuestoTrabajo;
use Illuminate\Http\Request;

class PuestosTrabajoEstadisticasController extends Controller
{
    public function index(Request $request)
    {
        $usuario = $request->user();

        if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
            return response()->json([
                'message' => 'No tienes permisos para ver estas estadísticas.',
            ], 403);
        }

        $empresaId = $usuario->empresa_id;

        $totalPuestos = PuestoTrabajo::where(['empresa_id' => $empresaId,'activo' => true])->count();

        return response()->json([
            'message' => 'Estadísticas de puestos obtenidas correctamente.',
            'data' => [
                'total_puestos' => $totalPuestos,
            ],
        ]);
    }
}
