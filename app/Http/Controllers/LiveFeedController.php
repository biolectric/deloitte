<?php

namespace App\Http\Controllers;

use App\Models\SongRequest;
use App\Services\OnAirStats;
use Illuminate\Http\JsonResponse;

class LiveFeedController extends Controller
{
    public function __invoke(OnAirStats $stats): JsonResponse
    {
        return response()->json([
            'songs' => SongRequest::query()
                ->latest()
                ->limit(40)
                ->get(['id', 'title', 'artist', 'name', 'department', 'reason', 'created_at']),
            'stats' => $stats->summary(),
        ]);
    }
}
