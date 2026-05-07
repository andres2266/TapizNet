<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tareas_produccion', function (Blueprint $table) {
            $table->id();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->foreignId('orden_produccion_id')
                ->constrained('ordenes_produccion')
                ->cascadeOnDelete();

            $table->foreignId('unidad_fabricacion_id')
                ->constrained('unidades_fabricacion')
                ->cascadeOnDelete();

            $table->foreignId('proceso_fabricacion_id')
                ->constrained('procesos_fabricacion')
                ->restrictOnDelete();

            $table->foreignId('puesto_trabajo_id')
                ->constrained('puestos_de_trabajo')
                ->restrictOnDelete();

            $table->foreignId('trabajador_id')
                ->nullable()
                ->constrained('empleados')
                ->nullOnDelete();

            $table->foreignId('asignado_por')
                ->nullable()
                ->constrained('empleados')
                ->nullOnDelete();

            $table->unsignedInteger('orden');

            $table->string('nombre_tarea', 120);
            $table->text('descripcion')->nullable();

            $table->enum('estado', [
                'pendiente',
                'asignada',
                'en_progreso',
                'completada',
                'bloqueada',
                'cancelada',
            ])->default('pendiente');

            $table->timestamp('fecha_asignacion')->nullable();
            $table->timestamp('hora_inicio')->nullable();
            $table->timestamp('hora_fin')->nullable();

            $table->unsignedInteger('tiempo_estimado_minutos')->nullable();
            $table->unsignedInteger('tiempo_real_minutos')->nullable();

            $table->decimal('ganancia_destajo', 10, 2)->default(0);

            $table->text('comentarios')->nullable();

            $table->timestamps();

            $table->index(['empresa_id', 'estado']);
            $table->index(['orden_produccion_id', 'estado']);
            $table->index(['unidad_fabricacion_id', 'orden']);
            $table->index(['puesto_trabajo_id', 'estado']);
            $table->index(['trabajador_id', 'estado']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas_produccion');
    }
};
