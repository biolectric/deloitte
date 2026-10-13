<?php

namespace Database\Factories;

use App\Models\Message;
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
            'segment' => fake()->randomElement(Message::segments()),
            'media_path' => 'messages/example.webm',
            'media_type' => fake()->randomElement(['video', 'audio']),
            'name' => fake()->optional()->firstName(),
            'department' => fake()->optional()->randomElement(['Audit', 'Tax', 'Consulting', 'Risk', 'Finance']),
        ];
    }
}
