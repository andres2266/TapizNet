<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrdenesProduccion\CreateOrdenProduccionRequest;
use App\Models\Modelo;
use App\Models\OrdenProduccion;
use App\Models\ProcesoFabricacion;
use App\Models\TareaProduccion;
use App\Models\UnidadFabricacion;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrdenProduccionController extends Controller
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
    public function store(CreateOrdenProduccionRequest $request)
    {
         $user = $request->user();
         $data = $request->validated();

          try{
             $orden = DB::transaction(function () use($user,$data){
                 $modelo = Modelo::where('empresa_id', $user->empresa_id)->where('id', $data['modelo_id'])->first();

                if (!$modelo) {
                    abort(404, 'Modelo no encontrado.');
                } 

                $procesos = ProcesoFabricacion::where('modelo_id', $modelo->id)->orderBy('orden')->get();

                 if ($procesos->isEmpty()) {
                    abort(422, 'Este modelo no tiene proceso de fabricación configurado.');
                }

                $orden = OrdenProduccion::create([
                    'empresa_id' => $user->empresa_id,
                    'modelo_id' => $modelo->id,
                    'codigo' =>OrdenProduccion::generarCodigo(),
                    'cantidad' => $data['cantidad'],
                    'prioridad' => $data['prioridad'],
                    'estado' => 'pendiente',
                    'fecha_entrega_estimada' => $data['fecha_entrega_estimada'] ?? null,
                    'notas' => $data['notas'] ?? null,
                    'creado_por' => $user->id,
                ]);

                for ($i = 1; $i <= $data['cantidad']; $i++) {
                    $unidad = UnidadFabricacion::create([
                        'empresa_id' => $user->empresa_id,
                        'orden_produccion_id' => $orden->id,
                        'modelo_id' => $modelo->id,
                        'numero_unidad' => $i,
                        'estado' => 'pendiente',
                    ]);

                    foreach ($procesos as $proceso) {
                        TareaProduccion::create([
                            'empresa_id' => $user->empresa_id,
                            'orden_produccion_id' => $orden->id,
                            'unidad_fabricacion_id' => $unidad->id,
                            'proceso_fabricacion_id' => $proceso->id,
                            'puesto_trabajo_id' => $proceso->puesto_trabajo_id,
                            'empleado_id' => null,
     
                            'orden' => $proceso->orden,
                            'nombre_tarea' => $proceso->nombre_tarea,
                            'descripcion' => $proceso->descripcion,
                            'tiempo_estimado_minutos' => $proceso->tiempo_estimado_minutos,
                            'ganancia_destajo' => $proceso->precio_destajo,

                            'estado' => 'pendiente',
                            'fecha_asignacion' => null,
                            'hora_inicio' => null,
                            'hora_fin' => null,
                            'tiempo_real_minutos' => null,
                            'comentarios' => null,
                        ]);
                    }
                }

                 return $orden->load([
                    'modelo:id,nombre',
                    'unidadesFabricacion.tareasProduccion',
                ]);
               
             });

              return response()->json([
                'message' => 'Orden de producción creada correctamente.',
                'data' => $orden,
            ], 201);
         }catch(\Throwable $e){
                 return response()->json([
                'message' => 'No se pudo crear la orden de producción.',
                'error' => $e->getMessage(),
            ], 500);
         }
    }


    private function generarCodigoOrden(): string
    {
        $year = now()->year;
        $ultimoId = OrdenProduccion::max('id') + 1;

        return 'OP-' . $year . '-' . str_pad($ultimoId, 5, '0', STR_PAD_LEFT);
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
