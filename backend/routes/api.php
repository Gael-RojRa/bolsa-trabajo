<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;

Route::middleware('auth:sanctum')->group(function () {
    // CRUD básico (sin create/update/delete todavía)
    Route::get('/offers',          [OfferController::class, 'index']);
    Route::get('/offers/{offer}',  [OfferController::class, 'show']);

    Route::post('/offers/{offer}/accept',  [OfferController::class, 'accept']);
    Route::post('/offers/{offer}/reject',  [OfferController::class, 'reject']);
});

Route::post('/register', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'signIn']);

