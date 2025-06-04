<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Http\Resources\PostulationResource;
use App\Models\Offer;
use App\Models\Postulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecruiterController extends Controller
{
    /** 1) Ofertas del recruiter logueado */
    public function myOffers()
    {
        $recruiter = Auth::user()->recruiter;          // 1-a
        $offers    = $recruiter->offers()
                               ->withCount('postulations')
                               ->latest()
                               ->get();

        return OfferResource::collection($offers);     // 1-b
    }

    /** 2) Postulaciones de una oferta del recruiter */
    public function offerPostulations($offerId)
    {
        $recruiter = Auth::user()->recruiter;
        $offer     = $recruiter->offers()
                               ->where('id', $offerId)
                               ->firstOrFail();        // 2-a: 404 si no es suya

        $postulations = $offer->postulations()
                              ->with('user')           // incluye datos del candidato
                              ->get();

        return PostulationResource::collection($postulations);
    }

    /** 3) Cambiar status */
    public function updatePostulationStatus(Request $request, Postulation $postulation)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $recruiter = Auth::user()->recruiter;
        if ($postulation->offer->recruiter_id !== $recruiter->id) {
            return response()->json(['message' => 'Acción no autorizada'], 403);
        }

        $postulation->status = $request->status;
        $postulation->save();

        return response()->json(['message' => 'Estado actualizado.']);
    }
}
