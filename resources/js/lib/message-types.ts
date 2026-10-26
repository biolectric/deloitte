export const MESSAGE_TYPES = [
    {
        value: 'compliment',
        label: 'Compliment / shout-out',
        hint: 'Who are you thanking, and why?',
    },
    {
        value: 'year_end',
        label: 'End of year / New Year',
        hint: 'Need inspiration? Try one of these — or write whatever you like.',
        prompts: [
            'What are your plans for the end of the year?',
            'What makes you feel warm / happy during this period?',
            'What are you looking forward to next year?',
            'What is your good resolution for the new year?',
        ],
    },
    {
        value: 'person_of_the_year',
        label: 'Person of the Year',
        hint: 'Nominate a colleague and tell us briefly why they deserve it.',
    },
] as const;

export type MessageTypeValue = (typeof MESSAGE_TYPES)[number]['value'];
