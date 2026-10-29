<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests see the coming soon page', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('on-air/coming-soon')
            ->has('goesLiveAt')
        );
});

test('logged in users are redirected to the secret word gate', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('home'))
        ->assertRedirect(route('onair.entry'));
});

test('home page renders on air experience after unlocking', function () {
    unlockOnAir()
        ->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('on-air/home')
            ->has('stats')
            ->has('viewerCount')
            ->has('adventDoors')
            ->has('broadcastAt')
        );
});
