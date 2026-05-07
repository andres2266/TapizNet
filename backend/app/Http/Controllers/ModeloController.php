<?php

namespace App\Http\Controllers;

use App\Http\Requests\Modelos\CreateModeloRequest;
use App\Models\Modelo;
use Illuminate\Http\Request;

class ModeloController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if (!in_array($user->rol, ['administrador', 'gestor'])) {
            return response()->json([
                'message' => 'No tienes permisos para ver los modelos.',
            ], 403);
        }
        $modelos = Modelo::where('empresa_id', $user->empresa_id)
            ->select('id', 'empresa_id', 'nombre', 'descripcion')
            ->withCount('procesosFabricacion')
            ->when($request->search, function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('nombre', 'like', "%{$request->search}%")
                        ->orWhere('descripcion', 'like', "%{$request->search}%");
                });
            })
            ->when($request->estado_proceso, function ($query) use ($request) {
                if ($request->estado_proceso === 'configurado') {
                    $query->has('procesosFabricacion');
                }

                if ($request->estado_proceso === 'sin_proceso') {
                    $query->doesntHave('procesosFabricacion');
                }
            })
            ->orderBy('nombre')
            ->paginate(10);

        return response()->json([
            'message' => 'Lista de modelos',
            'data' => $modelos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateModeloRequest  $request)
    {
        $user = $request->user();

        if (!in_array($user->rol, ['administrador', 'gestor'])) {
            return response()->json([
                'message' => 'No tienes permisos para crear modelos.',
            ], 403);
        }

        $data = $request->validated();

        $modelo = Modelo::create([
            'empresa_id' => $user->empresa_id,
            'nombre' => $data['nombre'],
            'descripcion' => $data['descripcion'] ?? null,
            'imagen_url' => $data['imagen_url'] ?? null,
        ]);

        return response()->json([
            'message' => 'Modelo creado correctamente.',
            'data' => $modelo,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

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
