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
            $table->enum('rol', ['propietario', 'administrador', 'gestor', 'operario'])->default('propietario')->change();
            });

         DB::table('empleados')->where('rol', 'propietario')->update(['rol' => 'administrador']);

        Schema::table('empleados', function (Blueprint $table) {
                $table->enum('rol', ['administrador', 'gestor', 'operario'])->default('administrador')->change();
        });
    }

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::table('empleados', function (Blueprint $table) {
            $table->enum('rol', ['propietario', 'administrador', 'gestor', 'operario'])
                  ->default('administrador')
                  ->change();
        });
          DB::table('empleados') ->where('rol', 'administrador')->update(['rol' => 'propietario']);

            Schema::table('empleados', function (Blueprint $table) {
            $table->enum('rol', ['propietario', 'gestor', 'operario'])->default('propietario')->change();
        });
    }
};
