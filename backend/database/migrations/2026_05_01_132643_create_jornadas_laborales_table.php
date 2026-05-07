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
        Schema::create('jornadas_laborales', function (Blueprint $table) {
               $table->id();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->foreignId('empleado_id')
                ->constrained('empleados')
                ->restrictOnDelete();

            $table->date('fecha');

            $table->timestamp('hora_inicio');
            $table->timestamp('hora_fin')->nullable();

            $table->unsignedInteger('minutos_trabajados')->nullable();

            $table->decimal('precio_hora', 10, 2);
            $table->decimal('total_ganado', 10, 2)->nullable();

            $table->text('observaciones')->nullable();

            $table->timestamps();

            $table->index(['empresa_id', 'fecha']);
            $table->index(['empleado_id', 'fecha']);
            $table->index(['empleado_id', 'hora_fin']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jornadas_laborales');
    }
};
