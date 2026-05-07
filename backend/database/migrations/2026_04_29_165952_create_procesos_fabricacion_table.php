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
        Schema::create('procesos_fabricacion', function (Blueprint $table) {
           $table->id();

            $table->foreignId('modelo_id')
        ->constrained('modelos')
        ->cascadeOnDelete();

            $table->foreignId('puesto_trabajo_id')
                ->constrained('puestos_de_trabajo')
                ->restrictOnDelete();

            $table->unsignedInteger('orden');

            $table->string('nombre_tarea', 120);

            $table->text('descripcion')->nullable();

            $table->unsignedInteger('tiempo_estimado_minutos')->nullable();

            $table->decimal('precio_destajo', 10, 2)->default(0);

            $table->timestamps();

            $table->unique(['modelo_id', 'orden']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procesos_fabricacion');
    }
};
