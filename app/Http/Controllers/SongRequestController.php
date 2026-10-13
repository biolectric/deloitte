<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSongRequestRequest;
use App\Models\SongRequest;
use Illuminate\Http\RedirectResponse;

class SongRequestController extends Controller
{
    public function store(StoreSongRequestRequest $request): RedirectResponse
    {
        SongRequest::query()->create($request->validated());

        return back()->with('success', 'Je verzoek staat live op de wachtrij.');
    }
}
