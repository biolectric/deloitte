<?php

namespace App\Http\Controllers;

use App\Http\Middleware\EnsureOnAirEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OnAirEntryController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        if (
            $request->session()->get(EnsureOnAirEntry::SESSION_KEY) === true
            || $request->user()?->isAdmin()
        ) {
            return redirect()->route('home');
        }

        return Inertia::render('on-air/gate');
    }

    public function unlock(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'secret_word' => ['required', 'string', 'max:255'],
        ], [
            'secret_word.required' => 'Whisper the secret word to come in.',
        ]);

        $expected = (string) config('onair.entry_word');

        if (! hash_equals($expected, $validated['secret_word'])) {
            return back()
                ->withInput()
                ->withErrors([
                    'secret_word' => 'Hmm, that isn’t the word. Try again!',
                ]);
        }

        $request->session()->put(EnsureOnAirEntry::SESSION_KEY, true);

        return redirect()->intended(route('home'));
    }
}
