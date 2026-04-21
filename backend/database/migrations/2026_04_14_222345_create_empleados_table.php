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
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empresa_id')->constrained('empresas')->cascadeOnDelete();
            $table->string('usuario')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('password');
            $table->string('nombre');
            $table->string('apellido')->nullable();
            $table->string('telefono', 20)->nullable();
            $table->string('dni', 20)->nullable()->unique();
            $table->enum('tipo_contrato', ['destajo', 'horas'])->default('horas');
            $table->decimal('precio_hora', 10, 2)->nullable();
            $table->decimal('saldo_pendiente', 10, 2)->default(0);
            $table->enum('rol', ['propietario', 'gestor', 'operario'])->default('propietario');
            $table->boolean('activo')->default(true);
            $table->rememberToken();
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
