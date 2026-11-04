<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdventDoor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdventDoorController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/advent', [
            'adventDoors' => AdventDoor::query()
                ->orderBy('day')
                ->get()
                ->map(fn (AdventDoor $door) => [
                    'id' => $door->id,
                    'day' => $door->day,
                    'title' => $door->title,
                    'body' => $door->body,
                    'cover_url' => $door->coverUrl(),
                    'media_type' => $door->media_type,
                    'media_url' => $door->mediaUrl(),
                    'unlock_date' => $door->unlock_date->toDateString(),
                ]),
        ]);
    }

    public function update(Request $request, AdventDoor $adventDoor): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:2000'],
            'cover' => ['nullable', 'file', 'max:20480', 'mimetypes:image/jpeg,image/png,image/webp,image/gif'],
            'remove_cover' => ['sometimes', 'boolean'],
            'media' => ['nullable', 'file', 'max:102400', 'mimetypes:image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime'],
            'remove_media' => ['sometimes', 'boolean'],
        ], [
            'cover.uploaded' => 'The cover image is too large for the server. Choose a smaller file.',
            'cover.max' => 'The cover image may be at most 20 MB.',
            'cover.mimetypes' => 'Cover must be an image (jpg, png, webp, gif).',
            'media.uploaded' => 'The surprise file is too large for the server. Choose a smaller file.',
            'media.max' => 'The surprise file may be at most 100 MB.',
            'media.mimetypes' => 'Surprise must be an image (jpg, png, webp, gif) or video (mp4, webm, mov).',
        ]);

        $adventDoor->title = $validated['title'];
        $adventDoor->body = $validated['body'];

        if ($request->boolean('remove_cover') && $adventDoor->cover_path) {
            Storage::disk('public')->delete($adventDoor->cover_path);
            $adventDoor->cover_path = null;
        }

        if ($request->hasFile('cover')) {
            if ($adventDoor->cover_path) {
                Storage::disk('public')->delete($adventDoor->cover_path);
            }

            $adventDoor->cover_path = $request->file('cover')->store('advent/covers', 'public');
        }

        if ($request->boolean('remove_media') && $adventDoor->media_path) {
            Storage::disk('public')->delete($adventDoor->media_path);
            $adventDoor->media_path = null;
            $adventDoor->media_type = null;
        }

        if ($request->hasFile('media')) {
            if ($adventDoor->media_path) {
                Storage::disk('public')->delete($adventDoor->media_path);
            }

            $file = $request->file('media');
            $mime = $file->getMimeType() ?? '';
            $adventDoor->media_type = str_starts_with($mime, 'video/') ? 'video' : 'image';
            $adventDoor->media_path = $file->store('advent', 'public');
        }

        $adventDoor->save();

        return back()->with('success', "Day {$adventDoor->day} updated.");
    }
}
