<?php

namespace App\Services;

use App\Models\Message;
use App\Models\SongRequest;
use Illuminate\Support\Facades\DB;

class OnAirStats
{
    /**
     * @return array{
     *     song_count: int,
     *     message_count: int,
     *     popular_song: array{title: string, artist: string, count: int}|null,
     *     busiest_department: array{department: string, count: int}|null
     * }
     */
    public function summary(): array
    {
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
            'song_count' => SongRequest::query()->count(),
            'message_count' => Message::query()->count(),
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
