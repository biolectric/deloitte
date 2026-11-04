<?php

use App\Models\AdventDoor;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('advent door unlocks on and after unlock date', function () {
    $door = AdventDoor::query()->create([
        'day' => 5,
        'title' => 'Test',
        'body' => 'Body',
        'unlock_date' => '2026-12-05',
    ]);

    expect($door->isUnlocked(Carbon::parse('2026-12-04')))->toBeFalse()
        ->and($door->isUnlocked(Carbon::parse('2026-12-05')))->toBeTrue()
        ->and($door->isUnlocked(Carbon::parse('2026-12-06')))->toBeTrue();
});

test('admins can upload a door cover and a surprise', function () {
    Storage::fake('public');

    $admin = User::factory()->admin()->create();
    $door = AdventDoor::query()->create([
        'day' => 1,
        'title' => 'Day one',
        'body' => 'Open me',
        'unlock_date' => '2026-12-01',
    ]);

    $this->actingAs($admin)
        ->put(route('dashboard.advent.update', $door), [
            'title' => 'Day one',
            'body' => 'Open me',
            'cover' => UploadedFile::fake()->image('door.jpg'),
            'media' => UploadedFile::fake()->image('surprise.png'),
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    $door->refresh();

    expect($door->cover_path)->not->toBeNull()
        ->and($door->media_path)->not->toBeNull()
        ->and($door->media_type)->toBe('image');

    Storage::disk('public')->assertExists($door->cover_path);
    Storage::disk('public')->assertExists($door->media_path);
});

test('advent admin page exposes cover and surprise urls', function () {
    $admin = User::factory()->admin()->create();
    AdventDoor::query()->create([
        'day' => 2,
        'title' => 'Day two',
        'body' => 'Body',
        'unlock_date' => '2026-12-02',
    ]);

    $this->actingAs($admin)
        ->get(route('dashboard.advent'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/advent')
            ->has('adventDoors.0.cover_url')
            ->has('adventDoors.0.media_url')
        );
});
