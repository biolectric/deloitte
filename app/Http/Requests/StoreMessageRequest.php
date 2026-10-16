<?php

namespace App\Http\Requests;

use App\Support\Departments;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMessageRequest extends FormRequest
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
            'media' => ['required', 'file', 'max:51200', 'mimetypes:video/mp4,video/webm,video/quicktime,audio/mpeg,audio/mp4,audio/webm,audio/wav,audio/x-wav,audio/ogg'],
            'name' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', Rule::in(Departments::all())],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'media.required' => 'Choose a video or voice file.',
            'media.file' => 'The file could not be uploaded. Please try again.',
            'media.uploaded' => 'The file is too large for the server (max. 50 MB). Choose a shorter or compressed file.',
            'media.max' => 'The file may be at most 50 MB.',
            'media.mimetypes' => 'Only video (mp4, webm, mov) or audio (mp3, wav, ogg) is allowed.',
            'department.in' => 'Choose a department from the list.',
        ];
    }
}
