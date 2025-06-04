<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InitialDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
            ['role' => 'user'],
            ['role' => 'recruiter'],
        ]);

        DB::table('users')->insert([
            [
                'name' => 'Recuiter Test',
                'email' => 'recruiter@test.com',
                'password' => Hash::make('12345678'),
                'role_id' => 2,
            ],
            [
                'name' => 'User Test',
                'email' => 'user@test.com',
                'password' => Hash::make('12345678'),
                'role_id' => 1,
            ],
        ]);

        DB::table('companies')->insert([
            'name' => 'CompanyTest',
            'logo' => 'https://www.svgrepo.com/show/303108/google-icon-logo.svg',
            'description' => 'Empresa de testeo',
        ]);

        DB::table('recruiters')->insert([
            'user_id' => 1,
            'company_id' => 1,
        ]);

        DB::table('areas')->insert([
            'area' => 'Web',
        ]);

        DB::table('locations')->insert([
            'country' => 'Liberia',
            'city' => 'Liberia City',
        ]);

        DB::table('skills')->insert([
            ['skill' => 'Laravel'],
            ['skill' => 'React'],
            ['skill' => 'PHP'],
            ['skill' => 'JavaScript'],
        ]);

        DB::table('offers')->insert([
            [
                'recruiter_id' => 1,
                'area_id' => 1,
                'location_id' => 1,
                'title' => 'Laravel Developer',
                'description' => 'We are searching for a laravel junior developer',
                'salary' => '2000',

            ],
            [
                'recruiter_id' => 1,
                'area_id' => 1,
                'location_id' => 1,
                'title' => 'React Developer',
                'description' => 'We are searching for a React junior developer',
                'salary' => '2000',

            ]

        ]);

        DB::table('offer_skill')->insert([
            ['offer_id' => 1, 'skill_id' => 1],
            ['offer_id' => 1, 'skill_id' => 3],
            ['offer_id' => 2, 'skill_id' => 2],
            ['offer_id' => 2, 'skill_id' => 4],
        ]);
    }
}
