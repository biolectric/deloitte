<?php

namespace App\Http\Requests;

use App\Support\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSongRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'artist' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'department' => ['required', 'string', Rule::in(Departments::all())],
            'reason' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a song title.',
            'artist.required' => 'Please enter an artist.',
            'name.required' => 'Enter your full name.',
            'department.required' => 'Choose an offering portfolio.',
            'department.in' => 'Choose an offering portfolio from the list.',
        ];
    }
}
