<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('advent_doors', 'media_path')) {
            return;
        }

        Schema::table('advent_doors', function (Blueprint $table) {
            $table->string('media_path')->nullable()->after('body');
            $table->string('media_type')->nullable()->after('media_path');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('advent_doors', 'media_path')) {
            return;
        }

        Schema::table('advent_doors', function (Blueprint $table) {
            $table->dropColumn(['media_path', 'media_type']);
        });
    }
};
