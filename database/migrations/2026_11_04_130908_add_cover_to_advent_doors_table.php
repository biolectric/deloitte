<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('advent_doors', 'cover_path')) {
            return;
        }

        Schema::table('advent_doors', function (Blueprint $table) {
            $table->string('cover_path')->nullable()->after('body');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('advent_doors', 'cover_path')) {
            return;
        }

        Schema::table('advent_doors', function (Blueprint $table) {
            $table->dropColumn('cover_path');
        });
    }
};
