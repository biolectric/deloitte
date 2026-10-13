<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SongRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

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

    public function destroy(SongRequest $songRequest): RedirectResponse
    {
        $songRequest->delete();

        return back()->with('success', 'Verzoek verwijderd.');
    }
}
