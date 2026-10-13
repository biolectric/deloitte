<?php

namespace Database\Factories;

use App\Models\SongRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SongRequest>
 */
class SongRequestFactory extends Factory
{
    protected $model = SongRequest::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'artist' => fake()->name(),
            'name' => fake()->optional()->firstName(),
            'department' => fake()->optional()->randomElement(['Audit', 'Tax', 'Consulting', 'Risk', 'Finance']),
            'reason' => fake()->optional()->sentence(),
        ];
    }
}
