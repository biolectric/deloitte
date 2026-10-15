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
            'video.required' => 'Choose a video file.',
            'video.uploaded' => 'The video is too large for the server. Choose a smaller file.',
            'video.max' => 'The video may be at most 100 MB.',
            'video.mimetypes' => 'Only mp4, webm or mov is allowed.',
        ]);


        $previous = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);
        $path = $request->file('video')->store('announcements', 'public');

        Setting::setValue(Setting::ANNOUNCEMENT_VIDEO_PATH, $path);

        if ($previous && $previous !== $path) {
            Storage::disk('public')->delete($previous);
        }

        return back()->with('success', 'Announcement video updated.');
    }

    public function destroy(): RedirectResponse
    {
        $path = Setting::getValue(Setting::ANNOUNCEMENT_VIDEO_PATH);

        if ($path) {
            Storage::disk('public')->delete($path);
            Setting::setValue(Setting::ANNOUNCEMENT_VIDEO_PATH, null);
        }

        return back()->with('success', 'Announcement video deleted.');
    }
}

