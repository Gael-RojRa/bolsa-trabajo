<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OfferSimpleResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'salary' => $this->salary,
            'company_name' => $this->recruiter->company->name,
            'company_logo' => $this->recruiter->company->logo,
        ];
    }
}
