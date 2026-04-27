<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
// Ruta de prueba
Route::get('/test', function () {
    return response()->json([
        'message' => 'API funcionando correctamente'
    ]);
});

// Ruta de registro
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/empleados', [EmpleadoController::class, 'store']);
    Route::get('/empleados', [EmpleadoController::class, 'view']);
    Route::put('/empleados/{empleado}', [EmpleadoController::class,'update']);
    Route::get('/empleados/{empleado}', [EmpleadoController::class, 'show']);
});