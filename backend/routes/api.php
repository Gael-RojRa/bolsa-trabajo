<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\PostulationController;

Route::post('/register', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'signIn']);

// Public endpoint for locations
Route::get('/locations', [\App\Http\Controllers\LocationController::class, 'index']);
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


use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\LocationController;

Route::middleware('auth:sanctum')->group(function () {
    // 1) Ofertas del recruiter logueado
    Route::get('/recruiter/offers',            [RecruiterController::class, 'myOffers']);
    // 1.1) Crear nueva oferta como recruiter
    Route::post('/recruiter/offers',           [RecruiterController::class, 'createOffer']);
    // 1.2) Obtener detalles de una oferta específica como recruiter
    Route::get('/recruiter/offers/{offer}',    [RecruiterController::class, 'getOffer'])->whereNumber('offer');
    // 1.3) Actualizar una oferta específica como recruiter
    Route::put('/recruiter/offers/{offer}',    [RecruiterController::class, 'updateOffer']);
    // Finalizar y listar ofertas finalizadas
    Route::get('/recruiter/offers/finished', [RecruiterController::class, 'finishedOffers']);
    Route::patch('/recruiter/offers/{offer}/finish', [RecruiterController::class, 'finishOffer']);
    Route::delete('/recruiter/offers/{offer}',           [RecruiterController::class, 'deleteOffer']);
    
    // 2) Postulaciones de una oferta concreta
    Route::get('/offers/{offer}/postulations', [RecruiterController::class, 'offerPostulations']);

    // 3) Aceptar / rechazar una postulación
    Route::patch('/postulations/{postulation}/status',
                 [RecruiterController::class, 'updatePostulationStatus']);
});

