<?php

namespace App\Http\Controllers;

use App\Http\Requests\TareasProduccion\AsignarTareaProduccionRequest;
use App\Models\Empleado;
use App\Models\HistorialTarea;
use App\Models\RegistroGanancia;
use App\Models\TareaProduccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TareaProduccionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (!in_array($user->rol, ['administrador', 'gestor'])) {
            return response()->json([
                'message' => 'No tienes permisos para ver todas las tareas.',
            ], 403);
        }

        $tareas = TareaProduccion::where('empresa_id', $user->empresa_id)
            ->with([
                'puestoTrabajo:id,nombre',
                'empleado:id,nombre,apellido,puesto_trabajo_id',
                'unidadFabricacion:id,numero_unidad,orden_produccion_id',
                'ordenProduccion:id,codigo,prioridad,estado',
            ])
            ->when($request->search, function ($query) use ($request) {
                $query->where(function ($q) use ($request) {
                    $q->where('nombre_tarea', 'like', "%{$request->search}%")
                        ->orWhere('descripcion', 'like', "%{$request->search}%")
                        ->orWhereHas('ordenProduccion', function ($ordenQuery) use ($request) {
                            $ordenQuery->where('codigo', 'like', "%{$request->search}%");
                        })
                        ->orWhereHas('empleado', function ($empleadoQuery) use ($request) {
                            $empleadoQuery
                                ->where('nombre', 'like', "%{$request->search}%")
                                ->orWhere('apellido', 'like', "%{$request->search}%");
                        });
                });
            })
            ->when($request->estado, function ($query) use ($request) {
                $query->where('estado', $request->estado);
            })
            ->when($request->puesto_trabajo_id, function ($query) use ($request) {
                $query->where('puesto_trabajo_id', $request->puesto_trabajo_id);
            })
            ->when($request->empleado_id, function ($query) use ($request) {
                $query->where('trabajador_id', $request->empleado_id); 
            })
            ->when($request->orden_produccion_id, function ($query) use ($request) {
                $query->where('orden_produccion_id', $request->orden_produccion_id);
            })
            ->when($request->prioridad, function ($query) use ($request) {
                $query->whereHas('ordenProduccion', function ($ordenQuery) use ($request) {
                    $ordenQuery->where('prioridad', $request->prioridad);
                });
            })
            ->when($request->solo_sin_asignar, function ($query) {
                $query->whereNull('trabajador_id'); 
            })
            ->orderBy('puesto_trabajo_id')
            ->orderBy('orden_produccion_id')
            ->orderBy('orden')
            ->paginate(10);

        return response()->json([
            'message' => 'Listado de tareas agrupadas por puesto de trabajo.',
            'data' => $tareas,
        ]);
    }

    public function asignar(AsignarTareaProduccionRequest $request, TareaProduccion $tarea)
    {
        $user = $request->user();
        $data = $request->validated();

        try {
            $tareaAsignada = DB::transaction(function () use ($user, $data, $tarea) {
                $tarea = TareaProduccion::where('empresa_id', $user->empresa_id)
                    ->where('id', $tarea->id)
                    ->lockForUpdate()
                    ->first();

                if (!$tarea) {
                    abort(404, 'Tarea no encontrada.');
                }

                if ($tarea->estado !== 'pendiente') {
                    abort(422, 'Esta tarea ya no está disponible para asignar.');
                }

                $empleado = Empleado::where('empresa_id', $user->empresa_id)
                    ->where('id', $data['empleado_id'])
                    ->where('activo', true)
                    ->first();

                if (!$empleado) {
                    abort(404, 'Empleado no encontrado o inactivo.');
                }

                if ($empleado->rol !== 'operario') {
                    abort(422, 'Solo se pueden asignar tareas de producción a operarios.');
                }

                if ($empleado->puesto_trabajo_id !== $tarea->puesto_trabajo_id) {
                    abort(422, 'El empleado no pertenece al puesto de trabajo requerido para esta tarea.');
                }

                $tieneTareaActiva = TareaProduccion::where('empresa_id', $user->empresa_id)
                    ->where('trabajador_id', $empleado->id) 
                    ->whereIn('estado', ['asignada', 'en_progreso'])
                    ->lockForUpdate()
                    ->exists();

                if ($tieneTareaActiva) {
                    abort(422, 'Este empleado ya tiene una tarea activa.');
                }

                $tarea->update([
                    'trabajador_id' => $empleado->id, 
                    'estado' => 'asignada',
                    'fecha_asignacion' => now(),
                ]);

                return $tarea->load([
                    'empleado:id,nombre,apellido,puesto_trabajo_id',
                    'puestoTrabajo:id,nombre',
                    'unidadFabricacion:id,numero_unidad',
                    'ordenProduccion:id,codigo',
                ]);
            });

            return response()->json([
                'message' => 'Tarea asignada correctamente.',
                'data' => $tareaAsignada,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'No se pudo asignar la tarea.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function autoAsignar(Request $request, TareaProduccion $tarea)
    {
        $user = $request->user();

        try {
            $tareaAsignada = DB::transaction(function () use ($user, $tarea) {
                $tarea = TareaProduccion::where('empresa_id', $user->empresa_id)
                    ->where('id', $tarea->id)
                    ->lockForUpdate()
                    ->first();

                if (!$tarea) {
                    abort(404, 'Tarea no encontrada.');
                }

                if ($tarea->estado !== 'pendiente') {
                    abort(422, 'Esta tarea ya no está disponible para autoasignarse.');
                }

                if (!$user->activo) {
                    abort(422, 'El empleado está inactivo.');
                }

                if ($user->puesto_trabajo_id !== $tarea->puesto_trabajo_id) {
                    abort(422, 'No puedes asignarte una tarea de otro puesto de trabajo.');
                }

                $tieneTareaActiva = TareaProduccion::where('empresa_id', $user->empresa_id)
                    ->where('trabajador_id', $user->id) 
                    ->whereIn('estado', ['asignada', 'en_progreso'])
                    ->lockForUpdate()
                    ->exists();

                if ($tieneTareaActiva) {
                    abort(422, 'Ya tienes una tarea activa.');
                }

                $tarea->update([
                    'trabajador_id' => $user->id,
                    'estado' => 'asignada',
                    'fecha_asignacion' => now(),
                ]);

                return $tarea->load([
                    'empleado:id,nombre,apellido,puesto_trabajo_id',
                    'puestoTrabajo:id,nombre',
                    'unidadFabricacion:id,numero_unidad',
                    'ordenProduccion:id,codigo',
                ]);
            });

            return response()->json([
                'message' => 'Tarea autoasignada correctamente.',
                'data' => $tareaAsignada,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'No se pudo autoasignar la tarea.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function misDisponibles(Request $request)
{
    $user = $request->user();

    if (!$user->activo) {
        return response()->json([
            'message' => 'El empleado está inactivo.',
        ], 403);
    }

    if (!$user->puesto_trabajo_id) {
        return response()->json([
            'message' => 'No tienes un puesto de trabajo asignado.',
        ], 422);
    }

    $tareas = TareaProduccion::where('empresa_id', $user->empresa_id)
        ->where('puesto_trabajo_id', $user->puesto_trabajo_id)
        ->where('estado', 'pendiente')
        ->when($request->search, function ($query) use ($request) {
            $query->where(function ($q) use ($request) {
                $q->where('nombre_tarea', 'like', "%{$request->search}%")
                    ->orWhere('descripcion', 'like', "%{$request->search}%")
                    ->orWhereHas('ordenProduccion', function ($ordenQuery) use ($request) {
                        $ordenQuery->where('codigo', 'like', "%{$request->search}%");
                    });
            });
        })
        ->when($request->prioridad, function ($query) use ($request) {
            $query->whereHas('ordenProduccion', function ($ordenQuery) use ($request) {
                $ordenQuery->where('prioridad', $request->prioridad);
            });
        })
        ->when($request->orden_produccion_id, function ($query) use ($request) {
            $query->where('orden_produccion_id', $request->orden_produccion_id);
        })
        ->with([
            'puestoTrabajo:id,nombre',
            'unidadFabricacion:id,numero_unidad,orden_produccion_id',
            'ordenProduccion:id,codigo,prioridad',
        ])
        ->orderBy('orden_produccion_id')
        ->orderBy('unidad_fabricacion_id')
        ->orderBy('orden')
        ->paginate(10);

    return response()->json([
        'message' => 'Listado de tareas disponibles para tu puesto de trabajo.',
        'data' => $tareas,
    ]);
}

public function terminar(Request $request, TareaProduccion $tarea)
{
    $user = $request->user();

    $tareaTerminada = DB::transaction(function () use ($user, $tarea, $request) {
        $tarea = TareaProduccion::where('empresa_id', $user->empresa_id)
            ->where('id', $tarea->id)
            ->lockForUpdate()
            ->first();

        if (!$tarea) {
            abort(404, 'Tarea no encontrada.');
        }

        if ($tarea->trabajador_id !== $user->id) {
            abort(403, 'No puedes terminar una tarea que no tienes asignada.');
        }

        if (!in_array($tarea->estado, ['asignada', 'en_progreso'])) {
            abort(422, 'Solo puedes terminar una tarea asignada o en proceso.');
        }

        if (!$user->activo) {
            abort(422, 'El empleado está inactivo.');
        }

        $estadoAnterior = $tarea->estado;
        $horaInicio = $tarea->hora_inicio;
        $horaFin = now();

        $tiempoRealMinutos = null;

        if ($horaInicio) {
            $tiempoRealMinutos = $horaInicio->diffInMinutes($horaFin);
        }

        $ganancia = 0;

        if ($user->tipo_contrato === 'destajo') {
            $ganancia = $tarea->precio_destajo ?? $tarea->ganancia_destajo ?? 0;
        }

        $tarea->update([
            'estado' => 'completada',
            'hora_fin' => $horaFin,
            'tiempo_real_minutos' => $tiempoRealMinutos,
            'ganancia_destajo' => $ganancia,
        ]);

        if ($user->tipo_contrato === 'destajo' && $ganancia > 0) {
            RegistroGanancia::create([
                'empresa_id' => $user->empresa_id,
                'tarea_produccion_id' => $tarea->id,
                'empleado_id' => $user->id,
                'fecha' => now()->toDateString(),
                'cantidad_ganada' => $ganancia,
                'descripcion' => 'Ganancia por completar la tarea: ' . $tarea->nombre_tarea,
            ]);

            $user->increment('saldo_pendiente', $ganancia);
        }

        HistorialTarea::create([
            'empresa_id' => $user->empresa_id,
            'tarea_produccion_id' => $tarea->id,
            'empleado_id' => $user->id,
            'estado_anterior' => $estadoAnterior,
            'estado_nuevo' => 'completada',
            'observaciones' => $request->input('observaciones'),
            'fecha_cambio' => now(),
        ]);

        return $tarea->load([
            'empleado:id,nombre,apellido,puesto_trabajo_id,saldo_pendiente',
            'puestoTrabajo:id,nombre',
            'unidadFabricacion:id,numero_unidad,orden_produccion_id',
            'ordenProduccion:id,codigo,prioridad',
        ]);
    });

    return response()->json([
        'message' => 'Tarea terminada correctamente.',
        'data' => $tareaTerminada,
    ]);
}


}