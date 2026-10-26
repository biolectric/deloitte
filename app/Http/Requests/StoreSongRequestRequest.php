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
            'name' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', Rule::in(Departments::all())],
            'reason' => ['nullable', 'string', 'max:500'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a title.',
            'artist.required' => 'Please enter an artist.',
            'department.in' => 'Choose an offering portfolio from the list.',
        ];
    }
}
