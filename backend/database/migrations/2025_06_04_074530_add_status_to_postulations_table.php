<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('postulations', function (Blueprint $table) {
            $table->enum('status', ['pending','accepted','rejected'])
                  ->default('pending')
                  ->after('offer_id');
        });
    }
    
    public function down()
    {
        Schema::table('postulations', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
