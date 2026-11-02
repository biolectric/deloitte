<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admins can view the users page', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('dashboard.users'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard/users')
            ->has('users')
        );
});

test('admins can create a user with email and password', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->post(route('dashboard.users.store'), [
            'email' => 'editor@deloitte.onair',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    $created = User::query()->where('email', 'editor@deloitte.onair')->first();

    expect($created)->not->toBeNull()
        ->and($created->is_admin)->toBeTrue()
        ->and($created->email_verified_at)->not->toBeNull();
});

test('non-admins cannot create users', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->post(route('dashboard.users.store'), [
            'email' => 'editor@deloitte.onair',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])
        ->assertForbidden();
});
