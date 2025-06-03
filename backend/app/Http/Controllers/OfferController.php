<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;
use App\Http\Resources\OfferResource;
use App\Http\Resources\OfferSimpleResource;


class OfferController extends Controller
{
    public function index()
    {
        $offers = Offer::with('recruiter.company')->get();
        return OfferSimpleResource::collection($offers);
    }

    public function show($id)
    {
        $offer = Offer::with(['recruiter.company', 'area', 'location', 'skills'])->findOrFail($id);
        return new OfferResource($offer);
    }
}
