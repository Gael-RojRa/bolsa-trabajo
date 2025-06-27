<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruiter_id',
        'area_id',
        'location_id',
        'title',
        'description',
        'requirements',
        'salary',
        'working_hours',
        'status',
    ];

    public function recruiter(): BelongsTo
    {
        return $this->belongsTo(Recruiter::class);
    }

    public function area(): BelongsTo
    {
        return $this->belongsTo(Area::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    public function postulations(): HasMany
    {
        return $this->hasMany(Postulation::class);
    }

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFinished($query)
    {
        return $query->where('status', 'finished');
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'offer_skill');
    }
}
