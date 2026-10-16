<?php

namespace Database\Factories;

use App\Models\SongRequest;
use App\Support\Departments;
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
            'department' => fake()->optional()->randomElement(Departments::all()),
            'reason' => fake()->optional()->sentence(),
        ];
    }
}
