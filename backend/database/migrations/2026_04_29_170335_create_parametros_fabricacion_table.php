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
        Schema::create('parametros_fabricacion', function (Blueprint $table) {
            $table->id();

            $table->foreignId('proceso_fabricacion_id')
                ->constrained('procesos_fabricacion')
                ->cascadeOnDelete();

            $table->string('nombre_parametro', 100);

            $table->text('valor');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parametros_fabricacion');
    }
};
