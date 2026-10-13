<?php

use App\Models\SongRequest;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('non-admins cannot access dashboard', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertForbidden();
});

test('admins can delete song requests', function () {
    $admin = User::factory()->admin()->create();
    $song = SongRequest::factory()->create();

    $this->actingAs($admin)
        ->delete(route('dashboard.songs.destroy', $song))
        ->assertRedirect();

    $this->assertSoftDeleted($song);
});

test('admins can visit dashboard overview', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('latestSongs')
            ->has('latestMessages')
            ->has('stats')
        );
});
