<?php

namespace App\Http\Controllers;

use App\Models\AdventDoor;
use App\Models\Message;
use App\Models\Setting;
use App\Models\SongRequest;
use App\Services\OnAirStats;
use App\Support\MessageTypes;
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
                    'type' => $message->type,
                    'type_label' => $message->type
                        ? MessageTypes::label($message->type)
                        : 'Message',
                    'media_type' => $message->media_type,
                    'name' => $message->name,
                    'nominee' => $message->nominee,
                    'department' => $message->department,
                    'created_at' => $message->created_at,
                ]),
            'announcementVideoUrl' => $announcementPath
                ? Storage::disk('public')->url($announcementPath)
                : null,
            'adventDoorsCount' => AdventDoor::query()->count(),
            'broadcastAt' => Setting::getValue(Setting::BROADCAST_AT, '2026-12-01T08:00:00+01:00'),
        ]);
    }
}
