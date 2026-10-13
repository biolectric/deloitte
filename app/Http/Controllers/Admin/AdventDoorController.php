<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdventDoor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdventDoorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/advent', [
            'adventDoors' => AdventDoor::query()
                ->orderBy('day')
                ->get(['id', 'day', 'title', 'body', 'unlock_date'])
                ->map(fn (AdventDoor $door) => [
                    'id' => $door->id,
                    'day' => $door->day,
                    'title' => $door->title,
                    'body' => $door->body,
                    'unlock_date' => $door->unlock_date->toDateString(),
                ]),
        ]);

    }

    public function update(Request $request, AdventDoor $adventDoor): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:2000'],
        ]);

        $adventDoor->update($validated);

        return back()->with('success', "Dag {$adventDoor->day} bijgewerkt.");
    }
}
