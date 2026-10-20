<?php

namespace App\Http\Controllers;

use App\Models\AdventDoor;
use App\Models\ChristmasWish;
use App\Models\Message;
use App\Models\Setting;
use App\Models\SongRequest;
use App\Services\OnAirStats;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(OnAirStats $stats): Response
    {
        $announcementPath = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);

        return Inertia::render('dashboard', [
            'stats' => $stats->summary(),
            'wishCount' => ChristmasWish::query()->count(),
            'latestSongs' => SongRequest::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'title', 'artist', 'name', 'department', 'created_at']),
            'latestMessages' => Message::query()
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (Message $message) => [
                    'id' => $message->id,
                    'media_type' => $message->media_type,
                    'name' => $message->name,
                    'department' => $message->department,
                    'created_at' => $message->created_at,
                ]),
            'latestWishes' => ChristmasWish::query()
                ->latest()
                ->limit(5)
                ->get()
                ->map(fn (ChristmasWish $wish) => [
                    'id' => $wish->id,
                    'media_type' => $wish->media_type,
                    'name' => $wish->name,
                    'created_at' => $wish->created_at,
                ]),
            'announcementVideoUrl' => $announcementPath
                ? Storage::disk('public')->url($announcementPath)
                : null,
            'adventDoorsCount' => AdventDoor::query()->count(),
            'broadcastAt' => Setting::getValue(Setting::BROADCAST_AT, '2026-12-01T18:00:00+01:00'),
        ]);
    }
}
