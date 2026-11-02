<?php

use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the secret word gate', function () {
    $this->get(route('home'))
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
