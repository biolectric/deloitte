<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property int $day
 * @property string $title
 * @property string $body
 * @property string|null $media_path
 * @property string|null $media_type
 * @property Carbon $unlock_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['day', 'title', 'body', 'media_path', 'media_type', 'unlock_date'])]
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

    public function mediaUrl(): ?string
    {
        if (! $this->media_path) {
            return null;
        }

        return Storage::disk('public')->url($this->media_path);
    }
}
