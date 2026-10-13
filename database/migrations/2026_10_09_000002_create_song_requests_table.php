<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('song_requests', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('artist');
            $table->string('name')->nullable();
            $table->string('department')->nullable();
            $table->string('reason', 500)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['title', 'artist']);
            $table->index('department');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('song_requests');
    }
};
