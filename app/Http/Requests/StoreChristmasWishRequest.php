<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StoreChristmasWishRequest extends FormRequest
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
            'media' => ['nullable', 'file', 'max:51200', 'mimetypes:video/mp4,video/webm,video/quicktime,audio/mpeg,audio/mp4,audio/webm,audio/wav,audio/x-wav,audio/ogg'],
            'body' => ['nullable', 'string', 'max:5000'],
            'name' => ['required', 'string', 'max:255'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator): void {
            $hasMedia = $this->hasFile('media');
            $hasBody = filled($this->input('body'));

            if (! $hasMedia && ! $hasBody) {
                $validator->errors()->add(
                    'media',
                    'Send a video/voice file or a wish — you don’t need both.',
                );
            }
        });
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'media.file' => 'The file could not be uploaded. Please try again.',
            'media.uploaded' => 'The file is too large for the server (max. 50 MB). Choose a shorter or compressed file.',
            'media.max' => 'The file may be at most 50 MB.',
            'media.mimetypes' => 'Only video (mp4, webm, mov) or audio (mp3, wav, ogg) is allowed.',
            'name.required' => 'Please enter your full name.',
        ];
    }
}
