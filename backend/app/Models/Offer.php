<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'company_name',
        'location',
        'salary',
        'status',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    // — Relaciones
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
