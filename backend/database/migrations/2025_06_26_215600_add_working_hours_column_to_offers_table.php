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
        if (!Schema::hasColumn('offers', 'working_hours')) {
            Schema::table('offers', function (Blueprint $table) {
                $table->string('working_hours', 100)->nullable()->after('salary');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('offers', 'working_hours')) {
            Schema::table('offers', function (Blueprint $table) {
                $table->dropColumn('working_hours');
            });
        }
    }
};
