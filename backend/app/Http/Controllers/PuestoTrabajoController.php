<?php

namespace App\Http\Controllers;

use App\Http\Requests\PuestosTrabajo\CreatePuestoTrabajoRequest;
use App\Models\PuestoTrabajo;
use Illuminate\Http\Request;

class PuestoTrabajoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function view(Request $request)
    {
        $user = $request->user();

    if (!in_array($user->rol, ['administrador', 'gestor'])) {
        return response()->json([
            'message' => 'No tienes permisos para ver puestos de trabajo.'
        ], 403);
    }

    $puestosTrabajo = PuestoTrabajo::where('empresa_id', $user->empresa_id)
        ->when($request->search, function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->where('nombre', 'like', "%{$request->search}%");
            });
        })
        ->select('id', 'empresa_id', 'nombre')
        ->orderBy('nombre')
        ->paginate(10);

    return response()->json([
        'message' => 'Lista de puestos de trabajo',
        'data' => $puestosTrabajo
    ]);
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
    public function store(CreatePuestoTrabajoRequest  $request)
    {
        $user = $request->user();
        if ($user->rol !== 'administrador') {
            return response()->json([
                'message' => 'No tienes permisos para crear puestos de trabajo.',
            ], 403);
        }
        $data = $request->validated();
        $puestoTrabajo = PuestoTrabajo::create([
            'empresa_id' => $user->empresa_id,
            'nombre' => $data['nombre'],
        ]);

        return response()->json([
            'message' => 'Puesto de trabajo creado correctamente.',
            'data' => $puestoTrabajo,
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
        
    }
}
