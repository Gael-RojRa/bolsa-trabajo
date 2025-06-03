<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'salary' => $this->salary,
            'area' => $this->area->area,
            'location' => [
                'country' => $this->location->country,
                'city' => $this->location->city,
            ],
            'company' => [
                'name' => $this->recruiter->company->name,
                'logo' => $this->recruiter->company->logo,
                'description' => $this->recruiter->company->description,
            ],
            'skills' => $this->skills->pluck('skill'), // lista de habilidades requeridas
        ];
    }
}
