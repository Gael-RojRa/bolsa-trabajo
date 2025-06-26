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
        // Insertar roles si no existen
        if (DB::table('roles')->count() === 0) {
            DB::table('roles')->insert([
                ['role' => 'user'],
                ['role' => 'recruiter'],
            ]);
        }

        // Insertar usuarios si no existen
        $users = [
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
            [
                'name' => 'User Test',
                'email' => 'user2@test.com',
                'password' => Hash::make('12345678'),
                'role_id' => 1,
            ],
        ];

        foreach ($users as $user) {
            if (!DB::table('users')->where('email', $user['email'])->exists()) {
                DB::table('users')->insert($user);
            }
        }

        // Insertar compañía si no existe
        if (!DB::table('companies')->where('name', 'CompanyTest')->exists()) {
            DB::table('companies')->insert([
                'name' => 'CompanyTest',
                'logo' => 'https://www.svgrepo.com/show/303108/google-icon-logo.svg',
                'description' => 'Empresa de testeo',
            ]);
        }

        // Insertar reclutador si no existe
        if (!DB::table('recruiters')->where('user_id', 1)->exists()) {
            DB::table('recruiters')->insert([
                'user_id' => 1,
                'company_id' => 1,
            ]);
        }

        // Insertar área si no existe
        if (!DB::table('areas')->where('area', 'Web')->exists()) {
            DB::table('areas')->insert([
                'area' => 'Web',
            ]);
        }

        // Insertar ubicación si no existe
        if (!DB::table('locations')->where('country', 'Liberia')->exists()) {
            DB::table('locations')->insert([
                'country' => 'Liberia',
                'city' => 'Liberia City',
            ]);
        }

        // Insertar habilidades si no existen
        $skills = ['Laravel', 'React', 'PHP', 'JavaScript'];
        foreach ($skills as $skill) {
            if (!DB::table('skills')->where('skill', $skill)->exists()) {
                DB::table('skills')->insert(['skill' => $skill]);
            }
        }

        // Insertar ofertas si no existen
        $offers = [
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
        ];

        foreach ($offers as $offer) {
            if (!DB::table('offers')->where('title', $offer['title'])->exists()) {
                DB::table('offers')->insert($offer);
            }
        }

        // Insertar relaciones oferta-habilidad si no existen
        $offerSkills = [
            ['offer_id' => 1, 'skill_id' => 1],
            ['offer_id' => 1, 'skill_id' => 3],
            ['offer_id' => 2, 'skill_id' => 2],
            ['offer_id' => 2, 'skill_id' => 4],
        ];

        foreach ($offerSkills as $offerSkill) {
            if (!DB::table('offer_skill')->where([
                'offer_id' => $offerSkill['offer_id'],
                'skill_id' => $offerSkill['skill_id']
            ])->exists()) {
                DB::table('offer_skill')->insert($offerSkill);
            }
        }
    }
}
