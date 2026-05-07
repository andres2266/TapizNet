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
        Schema::create('unidades_fabricacion', function (Blueprint $table) {
            $table->id();

            $table->foreignId('orden_produccion_id')
                ->constrained('ordenes_produccion')
                ->cascadeOnDelete();

            $table->foreignId('modelo_id')
                ->constrained('modelos')
                ->restrictOnDelete();

            $table->unsignedInteger('numero_unidad');

            $table->enum('estado', [
                'pendiente',
                'en_progreso',
                'completada',
                'bloqueada',
                'cancelada',
            ])->default('pendiente');

            $table->timestamp('fecha_inicio')->nullable();
            $table->timestamp('fecha_terminado')->nullable();

            $table->text('observaciones')->nullable();

            $table->timestamps();

            $table->unique(['orden_produccion_id', 'numero_unidad']);
            $table->index(['orden_produccion_id', 'estado']);
            $table->index(['modelo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unidades_fabricacion');
    }
};
