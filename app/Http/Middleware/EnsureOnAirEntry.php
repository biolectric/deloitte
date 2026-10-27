<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnAirEntry
{
    public const SESSION_KEY = 'onair_entry_unlocked';

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->session()->get(self::SESSION_KEY) === true) {
            return $next($request);
        }

        if ($request->user()?->isAdmin()) {
            return $next($request);
        }

        return redirect()->guest(route('onair.entry'));
    }
}
