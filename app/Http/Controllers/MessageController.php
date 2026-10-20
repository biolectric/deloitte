<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;

class MessageController extends Controller
{
    public function store(StoreMessageRequest $request): RedirectResponse
    {
        $path = null;
        $mediaType = null;

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $mime = $file->getMimeType() ?? '';
            $mediaType = str_starts_with($mime, 'audio/') ? 'audio' : 'video';
            $path = $file->store('messages', 'public');
        }

        Message::query()->create([
            'media_path' => $path,
            'media_type' => $mediaType,
            'name' => $request->validated('name'),
            'department' => $request->validated('department'),
            'body' => $request->validated('body'),
        ]);

        return back()->with('message_success', 'Your message has been received.');
    }
}
