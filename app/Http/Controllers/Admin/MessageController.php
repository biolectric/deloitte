<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/messages', [
            'messages' => Message::query()
                ->latest()
                ->get()
                ->map(fn (Message $message) => [
                    'id' => $message->id,
                    'segment' => $message->segment,
                    'media_type' => $message->media_type,
                    'media_url' => $message->mediaUrl(),
                    'name' => $message->name,
                    'department' => $message->department,
                    'created_at' => $message->created_at,
                ]),
        ]);
    }

    public function destroy(Message $message): RedirectResponse
    {
        Storage::disk('public')->delete($message->media_path);
        $message->delete();

        return back()->with('success', 'Message deleted.');
    }
}
