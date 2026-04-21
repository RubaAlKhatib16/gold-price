<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoldController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoldNewsController;
use App\Http\Controllers\GoldPriceController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
Route::get('/gold-price', [GoldController::class, 'getPrice']);

/* Authentication Routes */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


/**/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/assets', [AssetController::class, 'index']);
    Route::post('/assets', [AssetController::class, 'store']);
    Route::delete('/assets/{id}', [AssetController::class, 'destroy']);

});

/* Dashboard Route */
Route::get('/dashboard', [DashboardController::class, 'index']);

Route::delete('/assets/{id}', [AssetController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/assets/{id}', [AssetController::class, 'show'])->middleware('auth:sanctum');
Route::put('/assets/{id}', [AssetController::class, 'update'])->middleware('auth:sanctum');

Route::get('/gold-news', [GoldNewsController::class, 'index']);

Route::get('/gold-price', [GoldPriceController::class, 'index']);

Route::get('/user', function (Request $request) {
    return $request->user();
});



Route::put('/user', [UserController::class, 'update']);
/*Route::middleware('auth:sanctum')->get('/dashboard', [DashboardController::class, 'index']);*/