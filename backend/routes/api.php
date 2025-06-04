<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PostulationController;

Route::post('/register', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'signIn']);
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/offers', [App\Http\Controllers\OfferController::class, 'index']);
//     Route::get('/offers/{id}', [App\Http\Controllers\OfferController::class, 'show']);

//     // Additional routes can be added here
// });

Route::get('/offers', [OfferController::class, 'index']); // listado simplificado
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/offers/{id}', [OfferController::class, 'show']);
});
Route::middleware('auth:sanctum')->post('/offers/apply', [PostulationController::class, 'apply']);



