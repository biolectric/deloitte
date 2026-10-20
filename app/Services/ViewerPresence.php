<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class ViewerPresence
{
    private const CACHE_KEY = 'onair.viewers';

    private const TTL_SECONDS = 45;

    public function heartbeat(string $viewerId): int
    {
        $now = time();
        $cutoff = $now - self::TTL_SECONDS;

        $viewers = Cache::get(self::CACHE_KEY, []);
        if (! is_array($viewers)) {
            $viewers = [];
        }

        $viewers[$viewerId] = $now;

        $viewers = array_filter(
            $viewers,
            static fn (mixed $seenAt): bool => is_int($seenAt) && $seenAt >= $cutoff,
        );

        Cache::put(self::CACHE_KEY, $viewers, now()->addMinutes(10));

        return count($viewers);
    }

    public function count(): int
    {
        $cutoff = time() - self::TTL_SECONDS;
        $viewers = Cache::get(self::CACHE_KEY, []);

        if (! is_array($viewers)) {
            return 0;
        }

        return count(array_filter(
            $viewers,
            static fn (mixed $seenAt): bool => is_int($seenAt) && $seenAt >= $cutoff,
        ));
    }
}
