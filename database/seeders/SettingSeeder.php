<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::setValue(Setting::BROADCAST_AT, '2026-12-01T08:00:00+01:00');

        Setting::setValue(Setting::ANNOUNCEMENT_VIDEO_PATH, null);
    }
}
