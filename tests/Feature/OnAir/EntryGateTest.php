<?php

use App\Http\Middleware\EnsureOnAirEntry;
use Inertia\Testing\AssertableInertia as Assert;

test('entry gate page renders', function () {
    $this->get(route('onair.entry'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('on-air/gate'));
});

test('correct secret word unlocks the site', function () {
    $this->post(route('onair.entry.unlock'), [
        'secret_word' => config('onair.entry_word'),
    ])
        ->assertRedirect(route('home'))
        ->assertSessionHas(EnsureOnAirEntry::SESSION_KEY, true);
});

test('wrong secret word is rejected', function () {
    $this->from(route('onair.entry'))
        ->post(route('onair.entry.unlock'), [
            'secret_word' => 'wrong-word',
        ])
        ->assertRedirect(route('onair.entry'))
        ->assertSessionHasErrors('secret_word')
        ->assertSessionMissing(EnsureOnAirEntry::SESSION_KEY);
});
