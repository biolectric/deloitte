export const MESSAGE_TYPES = [
    {
        value: 'compliment',
        label: 'Compliment / shout-out',
        hint: 'Who are you thanking, and why?',
    },
    {
        value: 'year_end',
        label: 'End of year / New Year',
        hint: 'What is your New Year’s resolution?',
    },
] as const;

export type MessageTypeValue = (typeof MESSAGE_TYPES)[number]['value'];
