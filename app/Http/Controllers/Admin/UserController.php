<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/users', [
            'users' => User::query()
                ->orderByDesc('created_at')
                ->get(['id', 'name', 'email', 'is_admin', 'created_at'])
                ->map(fn (User $user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'is_admin' => $user->is_admin,
                    'created_at' => $user->created_at?->toIso8601String(),
                ]),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ], [
            'email.required' => 'Choose an email address.',
            'email.unique' => 'That email is already in use.',
            'password.required' => 'Choose a password.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);

        $localPart = strstr($validated['email'], '@', true) ?: $validated['email'];

        $user = User::query()->create([
            'name' => $localPart,
            'email' => $validated['email'],
            'password' => $validated['password'],
            'is_admin' => true,
        ]);

        $user->forceFill(['email_verified_at' => now()])->save();

        return back()->with('success', 'User created.');
    }
}
