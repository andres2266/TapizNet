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
        Schema::create('registro_ganancias', function (Blueprint $table) {
              $table->id();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->foreignId('tarea_produccion_id')
                ->constrained('tareas_produccion')
                ->cascadeOnDelete();

            $table->foreignId('empleado_id')
                ->constrained('empleados')
                ->restrictOnDelete();

            $table->date('fecha');

            $table->decimal('cantidad_ganada', 10, 2);

            $table->text('descripcion')->nullable();

            $table->timestamps();

            $table->unique('tarea_produccion_id');
            $table->index(['empresa_id', 'fecha']);
            $table->index(['empleado_id', 'fecha']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registro_ganancias');
    }
};
