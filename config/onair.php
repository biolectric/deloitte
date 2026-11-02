<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Entry secret word
    |--------------------------------------------------------------------------
    |
    | Guests must enter this word before they can open the public T&L Tune In
    | site. Change via ONAIR_ENTRY_WORD in your .env file.
    |
    */

    'entry_word' => env('ONAIR_ENTRY_WORD', 'countdown'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast / kick-off moment
    |--------------------------------------------------------------------------
    |
    | Used for the homepage countdown display.
    |
    */

    'goes_live_at' => env('ONAIR_GOES_LIVE_AT', '2026-12-01T08:00:00+01:00'),

];
