<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Http\Resources\PostulationResource;
use App\Models\Offer;
use App\Models\Postulation;
use App\Models\Recruiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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
    
    /** 1.1) Crear nueva oferta como recruiter */
    public function createOffer(Request $request)
    {
        // Validación de campos
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'salary' => 'required|numeric|min:0',
            'workingHours' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:255',
        ]);
        
        try {
            // Obtener el recruiter actual
            $recruiter = Auth::user()->recruiter;
            
            if (!$recruiter) {
                return response()->json(['message' => 'Usuario no es un reclutador'], 403);
            }
            
            // Crear la oferta con los datos validados incluyendo los campos requeridos por el modelo
            $offerData = [
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'requirements' => $validatedData['requirements'] ?? null,
                'salary' => $validatedData['salary'],
                'recruiter_id' => $recruiter->id,
                // Usar valores por defecto o null para los campos requeridos por el modelo pero no enviados desde el frontend
                'area_id' => 1, // Área por defecto (puedes ajustar según tus necesidades)
                'location_id' => 1, // Ubicación por defecto (puedes ajustar según tus necesidades)
            ];
            
            // Crear y guardar la oferta con los datos completos
            $offer = Offer::create($offerData);
            
            // Retornar la oferta creada
            return new OfferResource($offer);
            
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al crear la oferta', 
                'error' => $e->getMessage(),
                'trace' => $e->getTrace()
            ], 500);
        }
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
