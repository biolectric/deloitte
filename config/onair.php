<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Entry secret word
    |--------------------------------------------------------------------------
    |
    | Logged-in users must enter this word before they can open the public
    | T&L Tune In homepage. Guests always see the coming-soon page.
    | Change via ONAIR_ENTRY_WORD in your .env file.
    |
    */

    'entry_word' => env('ONAIR_ENTRY_WORD', 'countdown'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast / kick-off moment
    |--------------------------------------------------------------------------
    |
    | Shown on the coming-soon page and used for the homepage countdown.
    |
    */

    'goes_live_at' => env('ONAIR_GOES_LIVE_AT', '2026-12-01T08:00:00+01:00'),

];
