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
        Schema::create('pagos_empleados', function (Blueprint $table) {
            $table->id();

            $table->foreignId('empresa_id')
                ->constrained('empresas')
                ->cascadeOnDelete();

            $table->foreignId('empleado_id')
                ->constrained('empleados')
                ->restrictOnDelete();

            $table->date('fecha_pago');

            $table->decimal('monto_pagado', 10, 2);
            $table->decimal('saldo_anterior', 10, 2);
            $table->decimal('saldo_restante', 10, 2);

            $table->enum('metodo_pago', [
                'efectivo',
                'transferencia',
                'cheque',
                'otro',
            ])->default('efectivo');

            $table->string('referencia_pago', 120)->nullable();
            $table->text('notas')->nullable();

            $table->foreignId('registrado_por')
                ->constrained('empleados')
                ->restrictOnDelete();

            $table->timestamps();

            $table->index(['empresa_id', 'fecha_pago']);
            $table->index(['empleado_id', 'fecha_pago']);
            $table->index(['registrado_por']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos_empleados');
    }
};
