<?php

namespace App\Http\Controllers;

use App\Http\Resources\OfferResource;
use App\Http\Resources\PostulationResource;
use App\Models\Offer;
use App\Models\Postulation;
use App\Models\Recruiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

class RecruiterController extends Controller
{
    /** 1) Ofertas del recruiter logueado */
    public function myOffers()
    {
        try {
            $recruiter = Auth::user()->recruiter;
            
            if (!$recruiter) {
                return response()->json(['message' => 'Usuario no es un reclutador'], 403);
            }
            
            // Construir query base con columnas seguras
            // Seleccionar todas las columnas para evitar problemas con columnas faltantes
            $offersQuery = $recruiter->offers();
            // Agregar conteo de postulaciones solo si existe la tabla
            if (Schema::hasTable('postulations')) {
                $offersQuery->withCount('postulations');
            }
            
            $offers = $offersQuery->latest()->get();
                              
            // Log para depuración
            \Log::info('Ofertas recuperadas para recruiter: ' . $recruiter->id, [
                'count' => $offers->count(),
                'ids' => $offers->pluck('id')
            ]);
            
            return OfferResource::collection($offers);
        
        } catch (\Exception $e) {
            \Log::error('Error al cargar ofertas del recruiter:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'recruiter_id' => Auth::user()->recruiter->id ?? 'unknown'
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error al cargar las ofertas', 
            ], 500);
        }
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
    
    /** 1.2) Obtener detalles de una oferta específica como recruiter */
    public function getOffer(Offer $offer)
    {
        try {
            // Verificar que el usuario es un reclutador y es el propietario de la oferta
            $recruiter = Auth::user()->recruiter;
            
            if (!$recruiter) {
                return response()->json(['message' => 'Usuario no es un reclutador'], 403);
            }
            
            if ($offer->recruiter_id !== $recruiter->id) {
                return response()->json(['message' => 'No tienes permiso para ver esta oferta'], 403);
            }
            
            // Retornar la oferta
            return new OfferResource($offer);
            
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener la oferta', 'error' => $e->getMessage()], 500);
        }
    }
    
    /** 1.3) Actualizar una oferta específica como recruiter */
    public function updateOffer(Request $request, Offer $offer)
    {
        // Método ultra simplificado para resolver el error 500
        try {
            // Obtener todos los campos pero sin validación para ver si ese es el problema
            $data = $request->all();
            
            // Actualizar con un enfoque directo para evitar el error de columna faltante
            $updateData = [
                'title' => $data['title'] ?? $offer->title,
                'description' => $data['description'] ?? $offer->description,
                'salary' => $data['salary'] ?? $offer->salary,
                'area_id' => $offer->area_id ?? 1,
                'location_id' => $offer->location_id ?? 1
            ];
            
            // Agregar campos opcionales solo si existen
            if (isset($data['workingHours'])) {
                $updateData['working_hours'] = $data['workingHours'];
            }
            
            if (isset($data['location']) && !is_array($data['location'])) {
                $updateData['location'] = $data['location'];
            }
            
            // Usar update en lugar de save para evitar problemas con columnas adicionales
            // Esto evita el uso del campo requirements que causa problemas
            $offer->update($updateData);
            
            // Responder con la oferta actualizada
            return response()->json(['success' => true, 'message' => 'Oferta actualizada correctamente', 'data' => $offer]);
            
        } catch (\Exception $e) {
            \Log::error('Error crítico al actualizar oferta:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'offer_id' => $offer->id,
                'data' => $request->all()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la oferta', 
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
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
