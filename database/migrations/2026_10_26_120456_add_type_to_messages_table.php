<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('messages', 'type')) {
            return;
        }

        Schema::table('messages', function (Blueprint $table) {
            $table->string('type')->nullable()->after('body');
        });

        DB::table('messages')->whereNull('type')->update(['type' => 'compliment']);
    }

    public function down(): void
    {
        if (! Schema::hasColumn('messages', 'type')) {
            return;
        }

        Schema::table('messages', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
