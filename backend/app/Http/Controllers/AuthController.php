<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Registro de usuario (Sign Up)
    public function signUp(Request $request)
    {
        // Validar los datos del usuario
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|confirmed', // Asegura que la contraseña se confirme
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Crear el token
        $token = $user->createToken('AppName')->plainTextToken;

        // Retornar la respuesta
        return response()->json(['user' => $user, 'token' => $token], 201);
    }

    // Inicio de sesión (Sign In)
public function signIn(Request $request)
{
    // Validar los datos de entrada
    $validator = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Verificar si el usuario existe y la contraseña es correcta
    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }

    // Generar el token
    $token = $user->createToken('AppName')->plainTextToken;

    // Retornar la respuesta
    return response()->json(['user' => $user, 'token' => $token]);
}

}
