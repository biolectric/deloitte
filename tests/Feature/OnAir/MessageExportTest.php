<?php

use App\Models\Message;
use App\Models\User;
use App\Support\MessageTypes;

test('admins can download messages as csv', function () {
    $admin = User::factory()->admin()->create();

    Message::factory()->create([
        'type' => MessageTypes::PERSON_OF_THE_YEAR,
        'nominee' => 'Alex Nominee',
        'name' => 'Sam Sender',
        'body' => 'Great colleague',
        'department' => null,
    ]);

    $response = $this->actingAs($admin)
        ->get(route('dashboard.messages.export'));

    $response->assertOk();
    expect($response->headers->get('content-disposition'))->toContain('.csv');

    $csv = $response->streamedContent();

    expect($csv)
        ->toContain('Type')
        ->toContain('Nominee')
        ->toContain('Alex Nominee')
        ->toContain('Sam Sender')
        ->toContain('Person of the Year');
});

test('non-admins cannot download messages csv', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)
        ->get(route('dashboard.messages.export'))
        ->assertForbidden();
});
