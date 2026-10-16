<?php

namespace App\Support;

final class Departments
{
    /**
     * Temporary list until the client sends the full department roster.
     *
     * @return list<string>
     */
    public static function all(): array
    {
        return [
            'Audit',
            'Consulting',
            'Finance',
            'HR',
            'IT',
            'Legal',
            'Marketing',
            'Operations',
            'Risk',
            'Tax',
            'Other',
        ];
    }
}
