<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'grade',
        'institution',
        'date_start',
        'date_finish',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
