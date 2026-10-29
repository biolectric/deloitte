<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnAirEntry
{
    public const SESSION_KEY = 'onair_entry_unlocked';

    /**
     * Public site: guests see coming soon; logged-in users must enter the
     * secret word once per session before reaching the homepage.
     * Same rules on every environment.
     *
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()) {
            return $this->comingSoon($request);
        }

        if ($request->session()->get(self::SESSION_KEY) === true) {
            return $next($request);
        }

        return redirect()->guest(route('onair.entry'));
    }

    private function comingSoon(Request $request): Response
    {
        if ($request->expectsJson() || ! $request->isMethod('GET')) {
            abort(403, 'T&L Tune In is not open yet.');
        }

        return Inertia::render('on-air/coming-soon', [
            'goesLiveAt' => config('onair.goes_live_at'),
        ])->toResponse($request);
    }
}
