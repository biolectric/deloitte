<?php

namespace App\Http\Controllers;

use App\Models\AdventDoor;
use App\Models\Setting;
use App\Services\OnAirStats;
use App\Services\ViewerPresence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request, OnAirStats $stats, ViewerPresence $presence): Response
    {
        $announcementPath = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);
        $broadcastAt = Setting::getValue(Setting::BROADCAST_AT, '2026-12-01T18:00:00+01:00');
        $viewerCount = $presence->heartbeat($request->session()->getId());
        $canAdmin = $request->user()?->isAdmin() ?? false;

        return Inertia::render('on-air/home', [
            'stats' => $stats->summary(),
            'viewerCount' => $viewerCount,
            'announcementVideoUrl' => $announcementPath
                ? Storage::disk('public')->url($announcementPath)
                : null,
            'broadcastAt' => $broadcastAt,
            'adventDoors' => AdventDoor::query()
                ->orderBy('day')
                ->get()
                ->map(function (AdventDoor $door) use ($canAdmin) {
                    $dateUnlocked = $door->isUnlocked();

                    return [
                        'id' => $door->id,
                        'day' => $door->day,
                        'title' => $door->title,
                        'body' => $door->body,
                        'media_type' => $door->media_type,
                        'media_url' => $door->mediaUrl(),
                        'unlock_date' => $door->unlock_date->toDateString(),
                        'unlocked' => $canAdmin || $dateUnlocked,
                        'date_unlocked' => $dateUnlocked,
                    ];
                }),
            'canAdmin' => $canAdmin,
        ]);
    }
}
