<?php

namespace App\Support;

final class MessageTypes
{
    public const COMPLIMENT = 'compliment';

    public const YEAR_END = 'year_end';

    public const PERSON_OF_THE_YEAR = 'person_of_the_year';

    /**
     * @return list<string>
     */
    public static function all(): array
    {
        return [
            self::COMPLIMENT,
            self::YEAR_END,
            self::PERSON_OF_THE_YEAR,
        ];
    }

    /**
     * Types available in the general “Send a message” form.
     *
     * @return list<string>
     */
    public static function general(): array
    {
        return [
            self::COMPLIMENT,
            self::YEAR_END,
        ];
    }

    public static function label(string $type): string
    {
        return match ($type) {
            self::COMPLIMENT => 'Compliment',
            self::YEAR_END => 'End of year / New Year',
            self::PERSON_OF_THE_YEAR => 'Person of the Year',
            default => $type,
        };
    }
}
