<?php

use App\Models\SongRequest;

test('guests can submit a song request', function () {
    $response = unlockOnAir()->post(route('songs.store'), [
        'title' => 'Africa',
        'artist' => 'Toto',
        'name' => 'Ian',
        'department' => 'Tax Transformation Consulting (TTC)',
        'reason' => 'Klassieker',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('song_requests', [
        'title' => 'Africa',
        'artist' => 'Toto',
        'department' => 'Tax Transformation Consulting (TTC)',
    ]);
});

test('song request requires title, artist, name and offering portfolio', function () {
    $response = unlockOnAir()->from('/')->post(route('songs.store'), [
        'title' => '',
        'artist' => '',
        'name' => '',
        'department' => '',
    ]);

    $response->assertSessionHasErrors(['title', 'artist', 'name', 'department']);
    expect(SongRequest::query()->count())->toBe(0);
});
