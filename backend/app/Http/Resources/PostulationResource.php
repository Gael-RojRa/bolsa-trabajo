<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostulationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'status'     => property_exists($this->resource, 'status') && $this->status ? $this->status : 'pending',
            'applied_at' => $this->created_at->toDateTimeString(),
            'candidate'  => [
                'id'    => $this->user->id,
                'name'  => $this->user->name,
                'email' => $this->user->email,
            ],
        ];
    }
}
