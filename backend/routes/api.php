<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\JornadaLaboralController;

use App\Http\Controllers\ModeloController;
use App\Http\Controllers\ModeloEstadisticaController;
use App\Http\Controllers\OrdenProduccionController;
use App\Http\Controllers\PagoEmpleadoController;
use App\Http\Controllers\PagoEstadisticaController;
use App\Http\Controllers\PagosEstadisticaController;
use App\Http\Controllers\ProcesoFabricacionController;
use App\Http\Controllers\PuestosTrabajoEstadisticasController;
use App\Http\Controllers\PuestoTrabajoController;
use App\Http\Controllers\TareaProduccionController;
use App\Http\Controllers\TareasEstadisticasController;

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
    Route::patch('/empleados/{empleado}/estado',[EmpleadoController::class, 'updateEstado']);

    // rutas de puesto de trabajo
    Route::post('/puestos-trabajo', [PuestoTrabajoController::class, 'store']);
    Route::get('/puestos-trabajo/view', [PuestoTrabajoController::class, 'view']);
    Route::patch('/puestos-trabajo/{puesto}/estado', [PuestoTrabajoController::class, 'cambiarEstado']);
    Route::get('/puestos-trabajo/{puestoTrabajo}/show', [PuestoTrabajoController::class, 'show']);
    Route::patch('/puestos-trabajo/{puestoTrabajo}/update', [PuestoTrabajoController::class, 'update']);
    //rutas de modelos
     
     Route::post('/modelos', [ModeloController::class, 'store']);
     Route::get('/modelos', [ModeloController::class, 'index']);
     Route::patch('/modelos/{modelo}/estado', [ModeloController::class, 'updateEstado']);
     Route::patch('/modelos/{modelo}', [ModeloController::class, 'update']);
     Route::get('/modelos/{modelo}', [ModeloController::class, 'show']);
     
     //rutas  procesos de fabricacion

      Route::post('/modelos/{modelo}/procesos-fabricacion', [ProcesoFabricacionController::class, 'store']);
      Route::patch('/modelos/{modelo}/proceso-fabricacion',[ProcesoFabricacionController::class, 'updateByModelo']);
      Route::get('/modelos/{modelo}/proceso-fabricacion',[ProcesoFabricacionController::class, 'showByModelo']);
      


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
        Route::get('/tareas-produccion/{tarea}/instrucciones', [TareaProduccionController::class, 'verInstrucciones']);

        //rutas de jornada laboral 

         Route::get('/jornadas/actual', [JornadaLaboralController::class, 'actual']);
         Route::post('/jornadas/iniciar', [JornadaLaboralController::class, 'iniciar']);
         Route::post('/jornadas/finalizar', [JornadaLaboralController::class, 'finalizar']);

         //rutas de pagoEmpleado

         Route::post('/pagos-empleados/{empleadoId}/registrar',[PagoEmpleadoController::class, 'registrar']);
         Route::get('/pagos-empleados/pendientes', [PagoEmpleadoController::class, 'pendientes']);


        // rutas de estadisticas
       Route::get('/modelo/estadisticas', [ModeloEstadisticaController::class, 'index']);
       Route::get('/estadisticas/pagos', [PagosEstadisticaController::class, 'index']);
       Route::get('/tareas/estadisticas', [TareasEstadisticasController::class, 'index']);
       Route::get('/puestos-trabajo/estadisticas', [PuestosTrabajoEstadisticasController::class, 'index']);
      

});


Route::post('/reset-db/{token}', function ($token) {

    if ($token !== env('DEPLOY_SECRET_TOKEN')) {
        abort(403);
    }

    Artisan::call('migrate:fresh', [
        '--force' => true,
    ]);

    return response()->json([
        'message' => 'Base de datos reiniciada correctamente',
        'output' => Artisan::output(),
    ]);
});
