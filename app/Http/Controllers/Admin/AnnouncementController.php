<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    public function edit(): Response
    {
        $announcementPath = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);

        return Inertia::render('dashboard/announcement', [
            'announcementVideoUrl' => $announcementPath
                ? Storage::disk('public')->url($announcementPath)
                : null,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'video' => ['required', 'file', 'max:102400', 'mimetypes:video/mp4,video/webm,video/quicktime'],
        ], [
            'video.required' => 'Kies een videobestand.',
            'video.uploaded' => 'De video is te groot voor de server. Kies een kleiner bestand.',
            'video.max' => 'De video mag maximaal 100 MB zijn.',
            'video.mimetypes' => 'Enkel mp4, webm of mov is toegelaten.',
        ]);


        $previous = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);
        $path = $request->file('video')->store('announcements', 'public');

        Setting::setValue(Setting::ANNOUNCEMENT_VIDEO_PATH, $path);

        if ($previous && $previous !== $path) {
            Storage::disk('public')->delete($previous);
        }

        return back()->with('success', 'Aankondigingsvideo bijgewerkt.');
    }

    public function destroy(): RedirectResponse
    {
        $path = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);

        if ($path) {
            Storage::disk('public')->delete($path);
            Setting::setValue(Setting::ANNOUNCEMENT_VIDEO_PATH, null);
        }

        return back()->with('success', 'Aankondigingsvideo verwijderd.');
    }
}

