<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Support\MessageTypes;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MessageController extends Controller
{
    public function index(): InertiaResponse
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
                    'media_filename' => $message->media_path
                        ? basename($message->media_path)
                        : null,
                    'has_media' => filled($message->media_path),
                    'body' => $message->body,
                    'name' => $message->name,
                    'nominee' => $message->nominee,
                    'department' => $message->department,
                    'created_at' => $message->created_at,
                ]),
        ]);
    }

    public function preview(Message $message): Response|BinaryFileResponse
    {
        abort_unless($message->media_path, 404);

        if (in_array($message->media_type, ['video', 'audio'], true)) {
            return response()->view('admin.media-preview', [
                'title' => 'Message media',
                'mediaType' => $message->media_type,
                'src' => route('dashboard.messages.media', $message),
            ]);
        }

        return $this->streamInline($message);
    }

    public function media(Message $message): BinaryFileResponse
    {
        return $this->streamInline($message);
    }

    public function download(Message $message): StreamedResponse|BinaryFileResponse
    {
        abort_unless($message->media_path && Storage::disk('public')->exists($message->media_path), 404);

        $filename = basename($message->media_path);

        return Storage::disk('public')->download(
            $message->media_path,
            $filename,
            ['Content-Type' => Storage::disk('public')->mimeType($message->media_path) ?: 'application/octet-stream'],
        );
    }

    public function destroy(Message $message): RedirectResponse
    {
        if ($message->media_path) {
            Storage::disk('public')->delete($message->media_path);
        }
        $message->delete();

        return back()->with('success', 'Message deleted.');
    }

    private function streamInline(Message $message): BinaryFileResponse
    {
        abort_unless($message->media_path && Storage::disk('public')->exists($message->media_path), 404);

        $path = Storage::disk('public')->path($message->media_path);
        $mime = Storage::disk('public')->mimeType($message->media_path) ?: 'application/octet-stream';
        $filename = basename($message->media_path);

        return response()->file($path, [
            'Content-Type' => $mime,
            'Content-Disposition' => 'inline; filename="'.$filename.'"',
        ]);
    }
}
