<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChristmasWishRequest;
use App\Models\ChristmasWish;
use Illuminate\Http\RedirectResponse;

class ChristmasWishController extends Controller
{
    public function store(StoreChristmasWishRequest $request): RedirectResponse
    {
        $path = null;
        $mediaType = null;

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mime = $file->getMimeType() ?? '';
            $mediaType = str_starts_with($mime, 'audio/') ? 'audio' : 'video';
            $path = $file->store('wishes', 'public');
        }

        ChristmasWish::query()->create([
            'media_path' => $path,
            'media_type' => $mediaType,
            'name' => $request->validated('name'),
            'body' => $request->validated('body'),
        ]);

        return back()->with('wish_success', 'Your holiday wish has been received.');
    }
}
