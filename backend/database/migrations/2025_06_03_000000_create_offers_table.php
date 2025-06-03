<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('company_name');
            $table->string('location')->nullable();
            $table->unsignedInteger('salary')->nullable();          // (₡/₱/€) opcional
            $table->enum('status', ['open', 'accepted', 'rejected'])->default('open');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // creador / reclutador
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
