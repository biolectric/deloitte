<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('messages', 'segment')) {
            return;
        }

        Schema::table('messages', function (Blueprint $table) {
            $table->dropIndex(['segment']);
            $table->dropColumn('segment');
        });
    }

    public function down(): void
    {
        if (Schema::hasColumn('messages', 'segment')) {
            return;
        }

        Schema::table('messages', function (Blueprint $table) {
            $table->string('segment')->default('compliment')->after('id');
            $table->index('segment');
        });
    }
};
