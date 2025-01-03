<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/sanctum/csrf-cookie', function () {
    return response()->json('CSRF TOKEN');
});

Route::get('/disp/users', [UserController::class, 'users']); // display user without middleware

Route::middleware('guest')->group(function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::delete('/delete/{id}', [UserController::class, 'delete']);
    Route::put('/update/{id}', [UserController::class, 'update']);
});
