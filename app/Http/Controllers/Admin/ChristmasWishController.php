<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChristmasWish;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ChristmasWishController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/wishes', [
            'wishes' => ChristmasWish::query()
                ->latest()
                ->get()
                ->map(fn (ChristmasWish $wish) => [
                    'id' => $wish->id,
                    'media_type' => $wish->media_type,
                    'media_url' => $wish->mediaUrl(),
                    'body' => $wish->body,
                    'name' => $wish->name,
                    'created_at' => $wish->created_at,
                ]),
        ]);
    }

    public function destroy(ChristmasWish $wish): RedirectResponse
    {
        if ($wish->media_path) {
            Storage::disk('public')->delete($wish->media_path);
        }
        $wish->delete();

        return back()->with('success', 'Christmas wish deleted.');
    }
}
