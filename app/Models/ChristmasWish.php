<?php

namespace App\Models;

use Database\Factories\ChristmasWishFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string|null $media_path
 * @property string|null $media_type
 * @property string $name
 * @property string|null $body
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable(['media_path', 'media_type', 'name', 'body'])]
class ChristmasWish extends Model
{
    /** @use HasFactory<ChristmasWishFactory> */
    use HasFactory, SoftDeletes;

    public function mediaUrl(): ?string
    {
        if (! $this->media_path) {
            return null;
        }

        return Storage::disk('public')->url($this->media_path);
    }
}
