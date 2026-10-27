<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SongRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SongRequestController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/songs', [
            'songs' => SongRequest::query()
                ->latest()
                ->get(['id', 'title', 'artist', 'name', 'department', 'reason', 'created_at']),
        ]);
    }

    public function export(): StreamedResponse
    {
        $filename = 'song-requests-'.now()->format('Y-m-d-His').'.csv';

        return response()->streamDownload(function (): void {
            $handle = fopen('php://output', 'w');

            // UTF-8 BOM so Excel opens accented characters correctly.
            fwrite($handle, "\xEF\xBB\xBF");

            fputcsv($handle, [
                'Title',
                'Artist',
                'Name',
                'Offering portfolio',
                'Reason',
                'Submitted at',
            ]);

            foreach (SongRequest::query()->latest()->cursor() as $song) {
                fputcsv($handle, [
                    $song->title,
                    $song->artist,
                    $song->name,
                    $song->department,
                    $song->reason,
                    optional($song->created_at)?->timezone(config('app.timezone'))->format('Y-m-d H:i:s'),
                ]);
            }

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function destroy(SongRequest $songRequest): RedirectResponse
    {
        $songRequest->delete();

        return back()->with('success', 'Request deleted.');
    }
}

