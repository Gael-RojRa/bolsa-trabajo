<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;
use App\Http\Resources\OfferResource;
use App\Http\Resources\OfferSimpleResource;
use Illuminate\Support\Facades\Auth;


class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::with('recruiter.company')->get();
        return OfferSimpleResource::collection($offers);
    }

public function show($id)
{
    $offer = Offer::with(['recruiter.company', 'location', 'skills'])->findOrFail($id);

    $hasApplied = false;
    if (Auth::check()) {
        $hasApplied = $offer->postulations()->where('user_id', Auth::id())->exists();
    }

    return response()->json([
        'data' => new OfferResource($offer),
        'has_applied' => $hasApplied
    ]);
}
}
