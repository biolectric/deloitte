<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnAirEntry
{
    public const SESSION_KEY = 'onair_entry_unlocked';

    /**
     * Guests and logged-in users must enter the secret word once per session
     * before reaching the public homepage. Same rules on every environment.
     *
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->session()->get(self::SESSION_KEY) === true) {
            return $next($request);
        }

        return redirect()->guest(route('onair.entry'));
    }
}
