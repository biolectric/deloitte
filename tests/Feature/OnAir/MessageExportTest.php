<?php

use App\Models\Message;
use App\Models\User;
use App\Support\MessageTypes;

test('admins can download a csv per message type', function () {
    $admin = User::factory()->admin()->create();

    Message::factory()->create([
        'type' => MessageTypes::COMPLIMENT,
        'name' => 'Sam Sender',
        'body' => 'Thanks for the help',
        'nominee' => null,
    ]);

    Message::factory()->create([
        'type' => MessageTypes::PERSON_OF_THE_YEAR,
        'nominee' => 'Alex Nominee',
        'name' => 'Sam Sender',
        'body' => 'Great colleague',
    ]);

    $response = $this->actingAs($admin)
        ->get(route('dashboard.messages.export', ['type' => MessageTypes::COMPLIMENT]));

    $response->assertOk();
    expect($response->headers->get('content-disposition'))->toContain('messages-compliment-');

    $csv = $response->streamedContent();

    expect($csv)
        ->toContain('Compliment / shout-out')
        ->toContain('Thanks for the help')
        ->not->toContain('Alex Nominee');
});

test('person of the year csv only includes that type', function () {
    $admin = User::factory()->admin()->create();

    Message::factory()->create([
        'type' => MessageTypes::YEAR_END,
        'name' => 'Taylor',
        'body' => 'New Year resolution',
    ]);

    Message::factory()->create([
        'type' => MessageTypes::PERSON_OF_THE_YEAR,
        'nominee' => 'Alex Nominee',
        'name' => 'Sam Sender',
        'body' => 'Great colleague',
    ]);

    $csv = $this->actingAs($admin)
        ->get(route('dashboard.messages.export', ['type' => MessageTypes::PERSON_OF_THE_YEAR]))
        ->streamedContent();

    expect($csv)
        ->toContain('Person of the Year')
        ->toContain('Alex Nominee')
        ->not->toContain('New Year resolution');
});

test('export requires a valid message type', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)
        ->get(route('dashboard.messages.export'))
        ->assertSessionHasErrors('type');
});

test('non-admins cannot download messages csv', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get(route('dashboard.messages.export', ['type' => MessageTypes::COMPLIMENT]))
        ->assertForbidden();
});
