<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Message;
use App\Support\MessageTypes;
use Illuminate\Http\RedirectResponse;

class MessageController extends Controller
{
    public function store(StoreMessageRequest $request): RedirectResponse
    {
        $type = $request->validated('type');

        Message::query()->create([
            'media_path' => null,
            'media_type' => null,
            'name' => $request->validated('name'),
            'nominee' => $type === MessageTypes::PERSON_OF_THE_YEAR
                ? $request->validated('nominee')
                : null,
            'department' => $request->validated('department'),
            'body' => $request->validated('body'),
            'type' => $type,
        ]);

        return back()->with('message_success', 'Your message has been received.');
    }
}
