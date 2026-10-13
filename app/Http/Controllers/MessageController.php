<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;

class MessageController extends Controller
{
    public function store(StoreMessageRequest $request): RedirectResponse
    {
        $file = $request->file('media');
        $mime = $file->getMimeType() ?? '';
        $mediaType = str_starts_with($mime, 'audio/') ? 'audio' : 'video';
        $path = $file->store('messages', 'public');

        Message::query()->create([
            'segment' => $request->validated('segment'),
            'media_path' => $path,
            'media_type' => $mediaType,
            'name' => $request->validated('name'),
            'department' => $request->validated('department'),
        ]);

        return back()->with('success', 'Je boodschap is ontvangen.');
    }
}
