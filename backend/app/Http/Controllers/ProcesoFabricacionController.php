<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcesoFabricacion\CreateProcesoFabricacionRequest;
use App\Models\Modelo;
use App\Models\PuestoTrabajo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProcesoFabricacionController extends Controller
{
      public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateProcesoFabricacionRequest $request,Modelo $modelo)
    {
         $usuario = $request->user();

        if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
            return response()->json([
                'message' => 'No tienes permisos para crear procesos de fabricación.',
            ], 403);
        }

        if ($modelo->empresa_id !== $usuario->empresa_id) {
            return response()->json([
                'message' => 'Modelo no encontrado.',
            ], 404);
        }

        $data = $request->validated();

        $puestosIds = collect($data['fases'])->pluck('puesto_trabajo_id')->unique()->values();

        $puestosValidos = PuestoTrabajo::where('empresa_id', $usuario->empresa_id)->whereIn('id', $puestosIds)->count();

        if ($puestosValidos !== $puestosIds->count()) {
            return response()->json([
                'message' => 'Uno o varios puestos de trabajo no pertenecen a tu empresa.',
            ], 422);
        }

        DB::transaction(function () use ($modelo, $data) {
            foreach ($data['fases'] as $faseData) {
                $fase = $modelo->procesosFabricacion()->create([
                    'puesto_trabajo_id' => $faseData['puesto_trabajo_id'],
                    'orden' => $faseData['orden'],
                    'nombre_tarea' => $faseData['nombre_tarea'],
                    'descripcion' => $faseData['descripcion'] ?? null,
                    'tiempo_estimado_minutos' => $faseData['tiempo_estimado_minutos'],
                    'precio_destajo' => $faseData['precio_destajo'],
                ]);

                if (!empty($faseData['parametros'])) {
                    foreach ($faseData['parametros'] as $parametroData) {
                        $fase->parametrosFabricacion()->create([
                            'nombre_parametro' => $parametroData['nombre'],
                            'valor' => $parametroData['valor'],
                        ]);
                    }
                }
            }
        });

        return response()->json([
            'message' => 'Proceso de fabricación creado correctamente.',
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
