<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Ruta de prueba
Route::get('/test', function () {
    return response()->json([
        'message' => 'API funcionando correctamente'
    ]);
});

// Ruta de registro
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',[AuthController::class,'login']);