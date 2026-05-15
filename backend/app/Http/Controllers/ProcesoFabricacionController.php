<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcesoFabricacion\CreateProcesoFabricacionRequest;
use App\Http\Requests\ProcesoFabricacion\UpdateProcesoFabricacionRequest;
use App\Http\Requests\PuestosTrabajo\UpdatePuestoTrabajoRequest;
use App\Models\Modelo;
use App\Models\ParametroFabricacion;
use App\Models\ProcesoFabricacion;
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
    public function showByModelo(Request $request, Modelo $modelo)
{
    $usuario = $request->user();

    if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
        return response()->json([
            'message' => 'No tienes permisos para ver este proceso de fabricación.',
        ], 403);
    }

    if ($usuario->empresa_id !== $modelo->empresa_id) {
        return response()->json([
            'message' => 'Modelo no encontrado.',
        ], 404);
    }

    $modelo->load([
        'procesosFabricacion' => function ($query) {
            $query->orderBy('orden');
        },
        'procesosFabricacion.puestoTrabajo:id,nombre',
        'procesosFabricacion.parametrosFabricacion:id,proceso_fabricacion_id,nombre_parametro,valor',
    ]);

    return response()->json([
        'message' => 'Proceso de fabricación encontrado correctamente.',
        'data' => $modelo,
    ]);
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
public function updateByModelo(UpdatePuestoTrabajoRequest $request, Modelo $modelo)
{
    $user = $request->user();

    if ($modelo->empresa_id !== $user->empresa_id) {
        return response()->json([
            'message' => 'Modelo no encontrado.'
        ], 404);
    }

    $data = $request->validated();

    DB::transaction(function () use ($data, $modelo, $user) {

        foreach ($data['fases'] as $faseData) {

            
            if (!empty($faseData['id'])) {
                // Fase existente
                $fase = ProcesoFabricacion::where('id', $faseData['id'])
                    ->where('modelo_id', $modelo->id)
                    ->whereHas('puestoTrabajo', function ($query) use ($user) {
                        $query->where('empresa_id', $user->empresa_id);
                    })
                    ->firstOrFail();

                $fase->update(collect($faseData)->only([
                    'puesto_trabajo_id',
                    'orden',
                    'nombre_tarea',
                    'descripcion',
                    'tiempo_estimado_minutos',
                    'precio_destajo',
                ])->toArray());

            } else {
                // Fase nueva
                $fase = ProcesoFabricacion::create([
                    'modelo_id' => $modelo->id,
                    'puesto_trabajo_id' => $faseData['puesto_trabajo_id'],
                    'orden' => $faseData['orden'],
                    'nombre_tarea' => $faseData['nombre_tarea'],
                    'descripcion' => $faseData['descripcion'],
                    'tiempo_estimado_minutos' => $faseData['tiempo_estimado_minutos'],
                    'precio_destajo' => $faseData['precio_destajo'],
                ]);
            }

            // 🔹 2. PARÁMETROS
            if (!empty($faseData['parametros'])) {
                foreach ($faseData['parametros'] as $parametroData) {

                    if (!empty($parametroData['id'])) {
                        // Parámetro existente
                        $parametro = ParametroFabricacion::where('id', $parametroData['id'])
                            ->where('proceso_fabricacion_id', $fase->id)
                            ->firstOrFail();

                        $parametro->update(collect($parametroData)->only([
                            'nombre',
                            'valor',
                        ])->toArray());

                    } else {
                        // Parámetro nuevo
                        ParametroFabricacion::create([
                            'proceso_fabricacion_id' => $fase->id,
                            'nombre' => $parametroData['nombre'],
                            'valor' => $parametroData['valor'],
                        ]);
                    }
                }
            }
        }
    });

    return response()->json([
        'message' => 'Proceso de fabricación actualizado correctamente.'
    ]);
}




    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
