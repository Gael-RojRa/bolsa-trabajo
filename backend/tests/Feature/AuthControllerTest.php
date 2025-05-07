<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register_successfully()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['user', 'token']);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    /** @test */
    public function user_cannot_register_with_invalid_data()
    {
        $response = $this->postJson('/api/register', [
            'name' => '',
            'email' => 'not-an-email',
            'password' => '123',
        ]);

        $response->assertStatus(422)
                 ->assertJsonStructure(['errors']);
    }

    /** @test */
    public function user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['user', 'token']);
    }

    /** @test */
    public function user_cannot_login_with_wrong_credentials()
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
                 ->assertJson(['message' => 'Credenciales incorrectas']);
    }
}
