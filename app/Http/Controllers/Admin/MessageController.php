<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Support\MessageTypes;
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
                    'type' => $message->type,
                    'type_label' => $message->type
                        ? MessageTypes::label($message->type)
                        : 'Message',
                    'media_type' => $message->media_type,
                    'media_url' => $message->mediaUrl(),
                    'body' => $message->body,
                    'name' => $message->name,
                    'nominee' => $message->nominee,
                    'department' => $message->department,
                    'created_at' => $message->created_at,
                ]),
        ]);
    }

    public function destroy(Message $message): RedirectResponse
    {
        if ($message->media_path) {
            Storage::disk('public')->delete($message->media_path);
        }
        $message->delete();

        return back()->with('success', 'Message deleted.');
    }
}
