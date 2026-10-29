<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Entry secret word
    |--------------------------------------------------------------------------
    |
    | Guests must enter this word before they can open the public T&L Tune In
    | site. Change it before go-live via ONAIR_ENTRY_WORD in your .env file.
    |
    */

    'entry_word' => env('ONAIR_ENTRY_WORD', 'countdown'),

    /*
    |--------------------------------------------------------------------------
    | Public go-live moment
    |--------------------------------------------------------------------------
    |
    | Before this timestamp the public site shows a coming-soon page.
    | Admins can still open the full site and the dashboard.
    |
    */

    'goes_live_at' => env('ONAIR_GOES_LIVE_AT', '2026-12-01T08:00:00+01:00'),

];
