<?php

namespace Tests\Feature;

use App\Models\Offer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OfferControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_list_open_offers()
    {
        Offer::factory()->count(3)->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)
                         ->getJson('/api/offers');

        $response->assertOk()
                 ->assertJsonCount(3, 'data');
    }

    /** @test */
    public function a_user_can_view_an_offer()
    {
        $offer = Offer::factory()->create();
        $user  = User::factory()->create();

        $response = $this->actingAs($user)
                         ->getJson("/api/offers/{$offer->id}");

        $response->assertOk()
                 ->assertJsonFragment(['id' => $offer->id]);
    }

    /** @test */
    public function a_user_can_accept_an_offer()
    {
        $offer = Offer::factory()->create();
        $user  = User::factory()->create();

        $response = $this->actingAs($user)
                         ->postJson("/api/offers/{$offer->id}/accept");

        $response->assertOk()
                 ->assertJson(['message' => 'Oferta aceptada']);

        $this->assertDatabaseHas('offers', [
            'id'     => $offer->id,
            'status' => 'accepted',
        ]);
    }

    /** @test */
    public function an_offer_cannot_be_accepted_twice()
    {
        $offer = Offer::factory()->create(['status' => 'accepted']);
        $user  = User::factory()->create();

        $this->actingAs($user)
             ->postJson("/api/offers/{$offer->id}/accept")
             ->assertStatus(409);
    }
}
