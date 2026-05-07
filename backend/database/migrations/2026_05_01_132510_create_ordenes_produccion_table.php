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
        Schema::create('ordenes_produccion', function (Blueprint $table) {
             $table->id();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->foreignId('modelo_id')
                ->constrained('modelos')
                ->restrictOnDelete();

            $table->string('codigo', 30)->unique();

            $table->unsignedInteger('cantidad');

            $table->enum('estado', [
                'pendiente',
                'en_produccion',
                'completada',
                'cancelada',
                'bloqueada',
            ])->default('pendiente');

            $table->enum('prioridad', [
                'baja',
                'normal',
                'alta',
                'urgente',
            ])->default('normal');

            $table->text('notas')->nullable();

            $table->foreignId('creado_por')
                ->constrained('empleados')
                ->restrictOnDelete();

            $table->timestamp('fecha_inicio')->nullable();
            $table->timestamp('fecha_finalizacion')->nullable();

            $table->timestamps();

            $table->index(['empresa_id', 'estado']);
            $table->index(['empresa_id', 'prioridad']);
            $table->index(['modelo_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordenes_produccion');
    }
};
