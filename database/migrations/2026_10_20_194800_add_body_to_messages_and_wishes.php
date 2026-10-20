<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('messages', 'body')) {
            Schema::table('messages', function (Blueprint $table) {
                $table->text('body')->nullable()->after('department');
            });
        }

        if (! Schema::hasColumn('christmas_wishes', 'body')) {
            Schema::table('christmas_wishes', function (Blueprint $table) {
                $table->text('body')->nullable()->after('name');
            });
        }

        Schema::table('messages', function (Blueprint $table) {
            $table->string('media_path')->nullable()->change();
            $table->string('media_type')->nullable()->change();
        });

        Schema::table('christmas_wishes', function (Blueprint $table) {
            $table->string('media_path')->nullable()->change();
            $table->string('media_type')->nullable()->change();
        });
    }

    public function down(): void
    {
        if (Schema::hasColumn('messages', 'body')) {
            Schema::table('messages', function (Blueprint $table) {
                $table->dropColumn('body');
            });
        }

        if (Schema::hasColumn('christmas_wishes', 'body')) {
            Schema::table('christmas_wishes', function (Blueprint $table) {
                $table->dropColumn('body');
            });
        }
    }
};
