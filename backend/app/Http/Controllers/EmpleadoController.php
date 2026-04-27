<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\Empleados\UpdateEmpleadoRequest;
use App\Http\Requests\Empleados\CreateEmpleadoRequest;
use App\Models\Empleado;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
class EmpleadoController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function view(Request $request)
{
    $usuario = $request->user();

    if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
        return response()->json([
            'message' => 'No tienes permisos para ver empleados.'
        ], 403);
    }


    $empleados = Empleado::where('empresa_id', $usuario->empresa_id)
        ->when($request->search, function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->where('nombre', 'like', "%{$request->search}%")
                  ->orWhere('apellido', 'like', "%{$request->search}%")
                  ->orWhere('usuario', 'like', "%{$request->search}%");
            });
        })
        ->when($request->rol, function ($query) use ($request) {
            $query->where('rol', $request->rol);
        })
        ->when($request->filled('activo'), function ($query) use ($request) {
            $query->where('activo', $request->activo);
        })->select('id', 'nombre', 'apellido', 'usuario', 'rol', 'activo')->paginate(10);

    return response()->json($empleados, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(CreateEmpleadoRequest $request)
{
    $usuario = $request->user();
    
    if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
        return response()->json([
            'message' => 'No tienes permisos para crear empleados.'
        ], 403);
    }


    $validated = $request->validated(); 

    $empleado = Empleado::create([
        'empresa_id' => $request->user()->empresa_id,
        'usuario'       => $validated['usuario'],
        'email'         => $validated['email'] ?? null,
        'password'      => Hash::make($validated['password']),
        'nombre'        => $validated['nombre'],
        'apellido'      => $validated['apellido'] ?? null,
        'telefono'      => $validated['telefono'] ?? null,
        'dni'           => $validated['dni'] ?? null,
        'tipo_contrato' => $validated['tipo_contrato'],
        'precio_hora'   => $validated['precio_hora'] ?? null,
        'saldo_pendiente' => 0,
        'rol'           => $validated['rol'],
        'activo'        => $validated['activo'] ?? true,
    ]);

    return response()->json([
        'message'  => 'Empleado creado correctamente',
        'empleado' => $empleado
    ], 201);
}

    /**
     * Display the specified resource.
     */
    public function show(Request $request,Empleado $empleado)
    {
    $usuario = $request->user();

    if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
        return response()->json([
            'message' => 'No tienes permisos para ver este empleado.',
        ], 403);
    }

    if ($usuario->empresa_id !== $empleado->empresa_id) {
        return response()->json([
            'message' => 'No puedes ver empleados de otra empresa.',
        ], 403);
    }

    return response()->json([
        'message' => 'Empleado encontrado correctamente.',
        'data' => $empleado,
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
   public function update(UpdateEmpleadoRequest $request, Empleado $empleado)
{
    $usuario = $request->user();

    if (!in_array($usuario->rol, ['administrador', 'gestor'])) {
        return response()->json([
            'message' => 'No tienes permisos para modificar un empleado.'
        ], 403);
    }

    $data = $request->validated();

    if (array_key_exists('password', $data)) {
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }
    }

    $data = array_filter($data, function ($value) {
        return $value !== null && $value !== '';
    });

    $empleado->update($data);

    return response()->json([
        'message' => 'Empleado actualizado correctamente',
        'empleado' => $empleado->fresh()
    ], 200);
}
}
