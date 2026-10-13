<?php

namespace App\Http\Requests;

use App\Models\Message;
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
            'segment' => ['required', 'string', Rule::in(Message::segments())],
            'media' => ['required', 'file', 'max:51200', 'mimetypes:video/mp4,video/webm,video/quicktime,audio/mpeg,audio/mp4,audio/webm,audio/wav,audio/x-wav,audio/ogg'],
            'name' => ['nullable', 'string', 'max:255'],
            'department' => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'media.required' => 'Kies een video- of spraakbestand.',
            'media.file' => 'Het bestand kon niet worden geüpload. Probeer opnieuw.',
            'media.uploaded' => 'Het bestand is te groot voor de server (max. 50 MB). Kies een korter of gecomprimeerd bestand.',
            'media.max' => 'Het bestand mag maximaal 50 MB zijn.',
            'media.mimetypes' => 'Enkel video (mp4, webm, mov) of audio (mp3, wav, ogg) is toegelaten.',
            'segment.required' => 'Kies een rubriek.',
            'segment.in' => 'Deze rubriek is niet geldig.',
        ];
    }
}

