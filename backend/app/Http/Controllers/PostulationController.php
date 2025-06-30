<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Postulation;

class PostulationController extends Controller
{
    public function apply(Request $request)
    {
        $request->validate([
            'offer_id' => 'required|exists:offers,id',
        ]);

        $user = Auth::user();
        $offerId = $request->offer_id;

        $exists = Postulation::where('user_id', $user->id)
            ->where('offer_id', $offerId)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Ya has aplicado a esta oferta.'
            ], 409);
        }

        Postulation::create([
            'user_id' => $user->id,
            'offer_id' => $offerId,
        ]);

        return response()->json([
            'message' => 'Postulación exitosa.'
        ], 201);
    }

    /**
     * Retorna las postulaciones aceptadas del usuario autenticado
     */
    public function accepted()
    {
        $user = Auth::user();

        $postulations = Postulation::with(['offer.location'])
            ->where('user_id', $user->id)
            ->where('status', 'accepted')
            ->latest()
            ->get();

        return \App\Http\Resources\PostulationResource::collection($postulations);
    }
}

