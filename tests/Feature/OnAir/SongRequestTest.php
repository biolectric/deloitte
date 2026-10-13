<?php

use App\Models\SongRequest;

test('guests can submit a song request', function () {
    $response = $this->post(route('songs.store'), [
        'title' => 'Africa',
        'artist' => 'Toto',
        'name' => 'Ian',
        'department' => 'Consulting',
        'reason' => 'Klassieker',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('song_requests', [
        'title' => 'Africa',
        'artist' => 'Toto',
        'department' => 'Consulting',
    ]);
});

test('song request requires title and artist', function () {
    $response = $this->from('/')->post(route('songs.store'), [
        'title' => '',
        'artist' => '',
    ]);

    $response->assertSessionHasErrors(['title', 'artist']);
    expect(SongRequest::query()->count())->toBe(0);
});
