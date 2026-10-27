<?php

namespace App\Http\Middleware;

use Carbon\CarbonImmutable;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnAirEntry
{
    public const SESSION_KEY = 'onair_entry_unlocked';

    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->isAdmin()) {
            return $next($request);
        }

        if (! $this->hasGoneLive()) {
            if ($request->expectsJson() || ! $request->isMethod('GET')) {
                abort(403, 'T&L Tune In is not live yet.');
            }

            return Inertia::render('on-air/coming-soon', [
                'goesLiveAt' => config('onair.goes_live_at'),
            ])->toResponse($request);
        }

        if ($request->session()->get(self::SESSION_KEY) === true) {
            return $next($request);
        }

        return redirect()->guest(route('onair.entry'));
    }

    private function hasGoneLive(): bool
    {
        // Local/testing stay open so editors and automated tests can work.
        if (app()->environment(['local', 'testing'])) {
            return true;
        }

        $goesLiveAt = config('onair.goes_live_at');

        if (! is_string($goesLiveAt) || $goesLiveAt === '') {
            return true;
        }

        return CarbonImmutable::now('Europe/Brussels')->gte(
            CarbonImmutable::parse($goesLiveAt),
        );
    }
}
