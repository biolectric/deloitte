<?php

namespace App\Http\Controllers;

use App\Models\AdventDoor;
use App\Models\Message;
use App\Models\Setting;
use App\Models\SongRequest;
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
        $broadcastAt = Setting::getValue(Setting::BROADCAST_AT, '2026-12-24T18:00:00+01:00');

        return Inertia::render('on-air/home', [
            'songs' => SongRequest::query()
                ->latest()
                ->limit(40)
                ->get(['id', 'title', 'artist', 'name', 'department', 'reason', 'created_at']),
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
            'segments' => collect(Message::segments())->map(fn (string $segment) => [
                'value' => $segment,
                'label' => match ($segment) {
                    Message::SEGMENT_LOST_IN_TRANSLATION => 'Lost in Translation',
                    Message::SEGMENT_GREEN_LINE => 'The Green Line',
                    Message::SEGMENT_OUT_OF_OFFICE => 'Out of Office 2027',
                    default => $segment,
                },
            ]),
            'canAdmin' => $request->user()?->isAdmin() ?? false,
        ]);
    }
}
