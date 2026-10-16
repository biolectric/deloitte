<?php

namespace Database\Factories;

use App\Models\Message;
use App\Support\Departments;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Message>
 */
class MessageFactory extends Factory
{
    protected $model = Message::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'media_path' => 'messages/example.webm',
            'media_type' => fake()->randomElement(['video', 'audio']),
            'name' => fake()->optional()->firstName(),
            'department' => fake()->optional()->randomElement(Departments::all()),
        ];
    }
}
