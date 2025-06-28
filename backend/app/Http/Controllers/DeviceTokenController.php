<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\DeviceToken;

class DeviceTokenController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'fcm_token' => 'required|string',
            'platform'   => 'nullable|string',
        ]);

        $user = Auth::user();
        DeviceToken::updateOrCreate(
            ['fcm_token' => $request->fcm_token],
            [
                'user_id'  => $user->id,
                'platform' => $request->platform,
            ]
        );

        return response()->json(['message' => 'Token guardado']);
    }
}
