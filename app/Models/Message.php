<?php

namespace App\Models;

use Database\Factories\MessageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $segment
 * @property string $media_path
 * @property string $media_type
 * @property string|null $name
 * @property string|null $department
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable(['segment', 'media_path', 'media_type', 'name', 'department'])]
class Message extends Model
{
    /** @use HasFactory<MessageFactory> */
    use HasFactory, SoftDeletes;

    public const SEGMENT_LOST_IN_TRANSLATION = 'lost_in_translation';

    public const SEGMENT_GREEN_LINE = 'green_line';

    public const SEGMENT_OUT_OF_OFFICE = 'out_of_office';

    /**
     * @return list<string>
     */
    public static function segments(): array
    {
        return [
            self::SEGMENT_LOST_IN_TRANSLATION,
            self::SEGMENT_GREEN_LINE,
            self::SEGMENT_OUT_OF_OFFICE,
        ];
    }

    public function mediaUrl(): string
    {
        return Storage::disk('public')->url($this->media_path);
    }
}
