<?php

use App\Models\AdventDoor;
use Illuminate\Support\Carbon;

test('advent door unlocks on and after unlock date', function () {
    $door = AdventDoor::query()->create([
        'day' => 5,
        'title' => 'Test',
        'body' => 'Body',
        'unlock_date' => '2026-12-05',
    ]);

    expect($door->isUnlocked(Carbon::parse('2026-12-04')))->toBeFalse()
        ->and($door->isUnlocked(Carbon::parse('2026-12-05')))->toBeTrue()
        ->and($door->isUnlocked(Carbon::parse('2026-12-06')))->toBeTrue();
});
