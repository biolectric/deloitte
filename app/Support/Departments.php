<?php

namespace App\Support;

final class Departments
{
    /**
     * @return list<string>
     */
    public static function all(): array
    {
        return [
            'BPS – Integrated Services',
            'BPS – FRO/HRO',
            'BPS – IACTS',
            'Deloitte Legal (DL)',
            'Direct Tax (GBT)',
            'Enabling Functions (EF)',
            'Global Employer Services (GES)',
            'Indirect Tax – VAT',
            'Indirect Tax – GTA',
            'Indirect Tax – GTCE',
            'Tax Transformation Consulting (TTC)',
        ];
    }
}
