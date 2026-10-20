<?php

namespace Database\Factories;

use App\Models\ChristmasWish;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChristmasWish>
 */
class ChristmasWishFactory extends Factory
{
    protected $model = ChristmasWish::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'media_path' => 'wishes/example.webm',
            'media_type' => fake()->randomElement(['video', 'audio']),
            'name' => fake()->name(),
            'body' => null,
        ];
    }
}
