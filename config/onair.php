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

    'entry_word' => env('ONAIR_ENTRY_WORD', 'deloitte123'),

];
