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
            'status'     => $this->status,
            'applied_at' => $this->created_at->toDateTimeString(),
            'offer' => [
                'id' => $this->offer->id,
                'title' => $this->offer->title,
                'salary' => $this->offer->salary,
                'working_hours' => $this->offer->working_hours,
                'location' => $this->whenLoaded('offer', function () {
                    return [
                        'city' => optional($this->offer->location)->city,
                        'country' => optional($this->offer->location)->country,
                    ];
                }),
            ],
            'candidate'  => [
                'id'    => $this->user->id,
                'name'  => $this->user->name,
                'email' => $this->user->email,
            ],
        ];
    }
}
