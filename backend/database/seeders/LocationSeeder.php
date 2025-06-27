<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['city' => 'San José',   'country' => 'Costa Rica'],
            ['city' => 'Alajuela',   'country' => 'Costa Rica'],
            ['city' => 'Cartago',    'country' => 'Costa Rica'],
            ['city' => 'Heredia',    'country' => 'Costa Rica'],
            ['city' => 'Liberia City','country' => 'Liberia'], // existente
            ['city' => 'Puntarenas', 'country' => 'Costa Rica'],
            ['city' => 'Limón',      'country' => 'Costa Rica'],
        ];

        foreach ($locations as $loc) {
            Location::firstOrCreate($loc);
        }
    }
}
