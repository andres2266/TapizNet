<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistroRequest;
use App\Models\Empleado;
use App\Models\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
   

    /**
     * Show the form for creating a new resource.
     */
    public function register(RegistroRequest $request){

    $validated = $request->validated();
    
    $resultado = DB::transaction(function () use ($validated) {
        $empresa = Empresa::create([
            'nombre'    => $validated['empresa_nombre'],
            'email'     => $validated['empresa_email'],
            'telefono'  => $validated['empresa_telefono'] ?? null,
            'direccion' => $validated['empresa_direccion'] ?? null,
            'activo'    => true,
        ]);

        $administrador = Empleado::create([
            'empresa_id'     => $empresa->id,
            'usuario'        => $validated['usuario'],
            'password'       => Hash::make($validated['password']),
            'nombre'         => $validated['nombre'],
            'apellido'       => $validated['apellido'] ?? null,
            'rol'            => 'administrador',
            'tipo_contrato'  => 'horas',
            'saldo_pendiente'=> 0,
            'activo'         => true,
        ]);

        $token = $administrador->createToken('auth_token')->plainTextToken;

        return [
            'empresa'     => $empresa,
            'administrador' => $administrador,
            'token'       => $token,
        ];
    });
            
    return response()->json([
        'message'     => 'Registro completado correctamente.',
        'token'       => $resultado['token'],
        'administrador' => $resultado['administrador'],
        'empresa'     => $resultado['empresa'],
        ], 201);
    
    }

    /**
     * Store a newly created resource in storage.
     */
    public function login(LoginRequest $request){

        $empleado = Empleado::where('usuario', $request->usuario)->orWhere('email', $request->usuario)->first();

        if (!$empleado || !Hash::check($request->password, $empleado->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Credenciales incorrectas.',
        ], 401);
    }

        if (!$empleado->activo) {
            return response()->json([
                'success' => false,
                'message' => 'Tu cuenta está desactivada. Contacta con el administrador.'
            ], 403);
        }

        $empleado->tokens()->delete();

        $token = $empleado->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message'=>'Inicio de sesión exitoso',
            'token'=>$token,
            'empleado'=>$empleado->load('empresa')
        ]);
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
