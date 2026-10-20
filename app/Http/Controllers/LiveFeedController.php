<?php

namespace App\Http\Controllers;

use App\Models\SongRequest;
use App\Services\OnAirStats;
use App\Services\ViewerPresence;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LiveFeedController extends Controller
{
    public function __invoke(Request $request, OnAirStats $stats, ViewerPresence $presence): JsonResponse
    {
        $viewerCount = $presence->heartbeat($request->session()->getId());

        return response()->json([
            'songs' => SongRequest::query()
                ->latest()
                ->limit(40)
                ->get(['id', 'title', 'artist', 'name', 'department', 'reason', 'created_at']),
            'stats' => $stats->summary(),
            'viewer_count' => $viewerCount,
        ]);
    }
}
