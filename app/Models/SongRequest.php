<?php

namespace App\Models;

use Database\Factories\SongRequestFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $artist
 * @property string|null $name
 * @property string|null $department
 * @property string|null $reason
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable(['title', 'artist', 'name', 'department', 'reason'])]
class SongRequest extends Model
{
    /** @use HasFactory<SongRequestFactory> */
    use HasFactory, SoftDeletes;
}
