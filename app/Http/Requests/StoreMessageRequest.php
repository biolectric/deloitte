<?php

namespace App\Http\Requests;

use App\Support\Departments;
use App\Support\MessageTypes;
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
        $isNomination = $this->input('type') === MessageTypes::PERSON_OF_THE_YEAR;

        return [
            'type' => [
                'required',
                'string',
                Rule::in($isNomination ? [MessageTypes::PERSON_OF_THE_YEAR] : MessageTypes::general()),
            ],
            'body' => ['required', 'string', 'max:5000'],
            'name' => ['required', 'string', 'max:255'],
            'nominee' => [
                Rule::requiredIf($isNomination),
                'nullable',
                'string',
                'max:255',
            ],
            'department' => ['nullable', 'string', Rule::in(Departments::all())],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'type.required' => 'Choose what kind of message you want to send.',
            'type.in' => 'Choose a message type from the list.',
            'name.required' => 'Enter your full name.',
            'nominee.required' => 'Enter the name of the person you want to nominate.',
            'body.required' => 'Please write your message.',
            'department.in' => 'Choose an offering portfolio from the list.',
        ];
    }
}
