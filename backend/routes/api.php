<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\JornadaLaboralController;
use App\Http\Controllers\JornadaLaboralController as ControllersJornadaLaboralController;
use App\Http\Controllers\JornadaLaboralController as HttpControllersJornadaLaboralController;
use App\Http\Controllers\JornadaLaboralController as AppHttpControllersJornadaLaboralController;
use App\Http\Controllers\ModeloController;
use App\Http\Controllers\OrdenProduccionController;
use App\Http\Controllers\ProcesoFabricacionController;
use App\Http\Controllers\PuestoTrabajoController;
use App\Http\Controllers\TareaProduccionController;

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

    // rutas de empleados
    Route::post('/empleados', [EmpleadoController::class, 'store']);
    Route::get('/empleados', [EmpleadoController::class, 'view']);
    Route::put('/empleados/{empleado}', [EmpleadoController::class,'update']);
    Route::get('/empleados/{empleado}', [EmpleadoController::class, 'show']);
    Route::patch('/empleados/{empleado}/asignar-puesto',[EmpleadoController::class, 'asignarPuestoTrabajo']);

    // rutas de puesto de trabajo
    Route::post('/puestos-trabajo', [PuestoTrabajoController::class, 'store']);
    Route::get('/puestos-trabajo', [PuestoTrabajoController::class, 'view']);

    //rutas de modelos
    
     Route::post('/modelos', [ModeloController::class, 'store']);
     Route::get('/modelos', [ModeloController::class, 'index']);
     
     //rutas  procesos de fabricacion

      Route::post('/modelos/{modelo}/procesos-fabricacion', [ProcesoFabricacionController::class, 'store']);

      // rutas de orden de produccion

       Route::post('/ordenes-produccion', [OrdenProduccionController::class, 'store']);
     
     // rutas de tareas de produccion

        Route::post('/tareas-produccion/{tarea}/asignar', [TareaProduccionController::class, 'asignar']);
        Route::post('/tareas-produccion/{tarea}/auto-asignar', [TareaProduccionController::class, 'autoAsignar']);
        Route::get('/tareas-produccion', [TareaProduccionController::class, 'index']);
        Route::get('/tareas-produccion/mis-disponibles', [TareaProduccionController::class, 'misDisponibles']);
        Route::patch('/operario/tareas/{tarea}/terminar',[TareaProduccionController::class, 'terminar']);
        Route::get('/operario/tareas/actual', [TareaProduccionController::class, 'miTareaActual']);
        Route::get('/tareas-produccion/{tarea}', [TareaProduccionController::class, 'show']);


        //rutas de jornada laboral 

         Route::get('/jornadas/actual', [JornadaLaboralController::class, 'actual']);
         Route::post('/jornadas/iniciar', [JornadaLaboralController::class, 'iniciar']);
         Route::post('/jornadas/finalizar', [JornadaLaboralController::class, 'finalizar']);


});