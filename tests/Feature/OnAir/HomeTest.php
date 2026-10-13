<?php

use Inertia\Testing\AssertableInertia as Assert;

test('home page renders on air experience', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('on-air/home')
            ->has('songs')
            ->has('stats')
            ->has('adventDoors')
            ->has('broadcastAt')
        );
});
