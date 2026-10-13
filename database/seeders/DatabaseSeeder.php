<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@deloitte.onair'],
            [
                'name' => 'On Air Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ],
        );

        $this->call([
            SettingSeeder::class,
            AdventDoorSeeder::class,
        ]);
    }
}
