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
        Schema::table('empleados', function (Blueprint $table) {
            $table->foreignId('puesto_trabajo_id')
                ->nullable()
                ->after('empresa_id')
                ->constrained('puestos_de_trabajo')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('empleados', function (Blueprint $table) {
            Schema::table('empleados', function (Blueprint $table) {
            $table->dropConstrainedForeignId('puesto_trabajo_id');
        });
        });
    }
};
