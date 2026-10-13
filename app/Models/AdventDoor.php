<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $day
 * @property string $title
 * @property string $body
 * @property Carbon $unlock_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['day', 'title', 'body', 'unlock_date'])]
class AdventDoor extends Model
{
    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'unlock_date' => 'date',
            'day' => 'integer',
        ];
    }

    public function isUnlocked(?Carbon $now = null): bool
    {
        $now ??= now();

        return $this->unlock_date->copy()->startOfDay()->lte($now->copy()->startOfDay());
    }

}
