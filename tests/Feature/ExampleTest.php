<?php

test('returns a successful response', function () {
    $this->get(route('home'))
        ->assertRedirect(route('onair.entry'));
});
