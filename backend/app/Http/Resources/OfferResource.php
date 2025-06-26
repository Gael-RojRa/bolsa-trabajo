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
            'requirements' => $this->when(property_exists($this->resource, 'requirements'), $this->requirements),
            'salary' => $this->salary,
            'area' => $this->area ? $this->area->area : null,
            'location' => $this->location ? [
                'country' => $this->location->country,
                'city' => $this->location->city,
            ] : null,
            'company' => $this->recruiter && $this->recruiter->company ? [
                'name' => $this->recruiter->company->name,
                'logo' => $this->recruiter->company->logo,
                'description' => $this->recruiter->company->description,
            ] : null,
            'skills' => $this->skills ? $this->skills->pluck('skill') : [], // lista de habilidades requeridas
        ];
    }
}
