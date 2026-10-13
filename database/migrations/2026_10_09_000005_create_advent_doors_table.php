<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('advent_doors', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('day')->unique();
            $table->string('title');
            $table->text('body');
            $table->date('unlock_date');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('advent_doors');
    }
};
