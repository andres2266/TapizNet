<?php

namespace App\Http\Controllers;

use App\Models\Modelo;
use Illuminate\Http\Request;

class ModeloEstadisticaController extends Controller
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

        $modelosActivos = Modelo::where('empresa_id', $empresaId)
            ->where('activo', true)
            ->count();

        $modelosSinProceso = Modelo::where('empresa_id', $empresaId)
            ->where('activo', true)
            ->doesntHave('procesosFabricacion')
            ->count();

        $modelosListosProduccion = Modelo::where('empresa_id', $empresaId)
            ->where('activo', true)
            ->has('procesosFabricacion')
            ->count();

        return response()->json([
            'message' => 'Estadísticas de modelos obtenidas correctamente.',
            'data' => [
                'modelos_activos' => $modelosActivos,
                'modelos_sin_proceso' => $modelosSinProceso,
                'modelos_listos_produccion' => $modelosListosProduccion,
            ],
        ]);
    }
}
