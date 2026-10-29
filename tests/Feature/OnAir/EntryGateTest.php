<?php

use App\Http\Middleware\EnsureOnAirEntry;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests see coming soon on the entry page', function () {
    $this->get(route('onair.entry'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('on-air/coming-soon'));
});

test('entry gate page renders for logged in users', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('onair.entry'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('on-air/gate'));
});

test('correct secret word unlocks the site', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('onair.entry.unlock'), [
            'secret_word' => config('onair.entry_word'),
        ])
        ->assertRedirect(route('home'))
        ->assertSessionHas(EnsureOnAirEntry::SESSION_KEY, true);
});

test('wrong secret word is rejected', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('onair.entry'))
        ->post(route('onair.entry.unlock'), [
            'secret_word' => 'wrong-word',
        ])
        ->assertRedirect(route('onair.entry'))
        ->assertSessionHasErrors('secret_word')
        ->assertSessionMissing(EnsureOnAirEntry::SESSION_KEY);
});

test('guests cannot unlock with the secret word', function () {
    $this->post(route('onair.entry.unlock'), [
        'secret_word' => config('onair.entry_word'),
    ])->assertForbidden();
});
