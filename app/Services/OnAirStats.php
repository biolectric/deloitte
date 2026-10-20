<?php

namespace App\Services;

use App\Models\ChristmasWish;
use App\Models\Message;
use App\Models\SongRequest;
use Illuminate\Support\Facades\DB;

class OnAirStats
{
    /**
     * @return array{
     *     song_count: int,
     *     message_count: int,
     *     wish_count: int,
     *     submission_count: int,
     *     popular_song: array{title: string, artist: string, count: int}|null,
     *     busiest_department: array{department: string, count: int}|null
     * }
     */
    public function summary(): array
    {
        $songCount = SongRequest::query()->count();
        $messageCount = Message::query()->count();
        $wishCount = ChristmasWish::query()->count();

        $popular = SongRequest::query()
            ->select('title', 'artist', DB::raw('count(*) as aggregate'))
            ->groupBy('title', 'artist')
            ->orderByDesc('aggregate')
            ->first();

        $department = SongRequest::query()
            ->select('department', DB::raw('count(*) as aggregate'))
            ->whereNotNull('department')
            ->where('department', '!=', '')
            ->groupBy('department')
            ->orderByDesc('aggregate')
            ->first();

        return [
            'song_count' => $songCount,
            'message_count' => $messageCount,
            'wish_count' => $wishCount,
            'submission_count' => $songCount + $messageCount + $wishCount,
            'popular_song' => $popular ? [
                'title' => $popular->title,
                'artist' => $popular->artist,
                'count' => (int) $popular->aggregate,
            ] : null,
            'busiest_department' => $department ? [
                'department' => $department->department,
                'count' => (int) $department->aggregate,
            ] : null,
        ];
    }
}
