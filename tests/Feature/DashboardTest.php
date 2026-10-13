<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $response = $this->get(route('dashboard'));
    $response->assertRedirect(route('login'));
});

test('authenticated non-admins cannot visit the dashboard', function () {
    $user = User::factory()->create(['is_admin' => false]);
    $this->actingAs($user);

    $this->get(route('dashboard'))->assertForbidden();
});

test('admins can visit the dashboard overview', function () {
    $user = User::factory()->admin()->create();
    $this->actingAs($user);

    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('stats')
            ->has('latestSongs')
        );
});
