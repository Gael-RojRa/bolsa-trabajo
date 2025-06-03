<?php

namespace Database\Factories;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory
{
    protected $model = Offer::class;

    public function definition(): array
    {
        return [
            'title'        => fake()->jobTitle(),
            'description'  => fake()->paragraph(),
            'company_name' => fake()->company(),
            'location'     => fake()->city(),
            'salary'       => fake()->numberBetween(500000, 1500000),
            'status'       => 'open',
            'user_id'      => User::factory(),
        ];
    }
}
