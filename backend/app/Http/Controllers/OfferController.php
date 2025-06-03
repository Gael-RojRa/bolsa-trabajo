<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OfferController extends Controller
{
    // GET /api/offers
    public function index()
    {
        return Offer::where('status', 'open')
                    ->latest()
                    ->paginate(15);
    }

    // GET /api/offers/{offer}
    public function show(Offer $offer)
    {
        return $offer;
    }

    // POST /api/offers/{offer}/accept
    public function accept(Offer $offer)
    {
        $this->authorizeCandidate($offer);

        $offer->update(['status' => 'accepted']);

        return response()->json(['message' => 'Oferta aceptada'], 200);
    }

    // POST /api/offers/{offer}/reject
    public function reject(Offer $offer)
    {
        $this->authorizeCandidate($offer);

        $offer->update(['status' => 'rejected']);

        return response()->json(['message' => 'Oferta rechazada'], 200);
    }

    // — Helpers
    private function authorizeCandidate(Offer $offer): void
    {
        // Si la app distingue “candidato” vs “reclutador”, cambia esta lógica.
        if ($offer->status !== 'open') {
            abort(409, 'La oferta ya fue respondida');
        }
    }
}
