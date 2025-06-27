<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Devuelve todas las ubicaciones disponibles.
     */
    public function index(Request $request)
    {
        // Podríamos paginar en el futuro; por ahora devolvemos todas
        $locations = Location::select('id', 'city', 'country')->orderBy('country')->orderBy('city')->get();
        return response()->json($locations);
    }
}
