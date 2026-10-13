<?php

use App\Models\Message;
use App\Models\SongRequest;

test('live feed returns songs and stats', function () {
    SongRequest::factory()->create([
        'title' => 'Africa',
        'artist' => 'Toto',
        'department' => 'Audit',
    ]);
    SongRequest::factory()->create([
        'title' => 'Africa',
        'artist' => 'Toto',
        'department' => 'Audit',
    ]);
    Message::factory()->create();

    $response = $this->getJson(route('live'));

    $response->assertOk()
        ->assertJsonPath('stats.song_count', 2)
        ->assertJsonPath('stats.message_count', 1)
        ->assertJsonPath('stats.popular_song.title', 'Africa')
        ->assertJsonPath('stats.busiest_department.department', 'Audit');
});
