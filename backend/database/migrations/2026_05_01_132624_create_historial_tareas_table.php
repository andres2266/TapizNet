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
        Schema::create('historial_tareas', function (Blueprint $table) {
             $table->id();

            $table->foreignId('tarea_produccion_id')
                ->constrained('tareas_produccion')
                ->cascadeOnDelete();

            $table->foreignId('empleado_id')
                ->constrained('empleados')
                ->restrictOnDelete();

            $table->string('estado_anterior', 30)->nullable();
            $table->string('estado_nuevo', 30);

            $table->text('observaciones')->nullable();

            $table->timestamp('fecha_cambio')->useCurrent();

            $table->timestamps();

            $table->index(['tarea_produccion_id']);
            $table->index(['empleado_id']);
            $table->index(['estado_nuevo']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_tareas');
    }
};
