<?php

namespace App\Http\Controllers;

use App\Models\AdventDoor;
use App\Models\Setting;
use App\Services\OnAirStats;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request, OnAirStats $stats): Response
    {
        $announcementPath = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);
        $broadcastAt = Setting::getValue(Setting::BROADCAST_AT, '2026-12-01T18:00:00+01:00');

        return Inertia::render('on-air/home', [
            'stats' => $stats->summary(),
            'announcementVideoUrl' => $announcementPath
                ? Storage::disk('public')->url($announcementPath)
                : null,
            'broadcastAt' => $broadcastAt,
            'adventDoors' => AdventDoor::query()
                ->orderBy('day')
                ->get()
                ->map(fn (AdventDoor $door) => [
                    'id' => $door->id,
                    'day' => $door->day,
                    'title' => $door->title,
                    'body' => $door->body,
                    'unlock_date' => $door->unlock_date->toDateString(),
                    'unlocked' => $door->isUnlocked(),
                ]),
            'canAdmin' => $request->user()?->isAdmin() ?? false,
        ]);
    }
}
