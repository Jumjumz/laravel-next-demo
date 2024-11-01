<?php

use App\Http\Controllers\LmscourseController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', function () {
    return response()->json([
        ['id' => 1, 'title' => 'First', 'message' => 'First Test API'],
        ['id' => 2, 'title' => 'Second', 'message' => 'I am so dumb!'],
        ['id' => 3, 'title' => 'WORKING!', 'message' => 'I am PRO!'],
        ['id' => 4, 'title' => 'Samples', 'message' => 'Finally!'],
    ]);

});

Route::get('/lmscourse', [LmscourseController::class, 'index']); // get courses
/*Route::middleware('auth:sanctum')->get('/lmscourse', function (Request $request) {
    return response()->json($request->lmscourses());
});*/
Route::post('/lmscourse/create', [LmscourseController::class, 'create' ]); // create courses
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json('CSRF TOKEN');
});
Route::get('/disp/users', [UserController::class, 'users']); // add user
//Route::get('/users', [UserController::class, 'index']);
/*Route::prefix('auth/spa')->group(function () {
    Route::post('/users', UserController::class)->middleware('guest');
});
/*Route::prefix('auth/spa')->group(function () {
    Route::post('/register', UserController::class)->middleware('guest');
});*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/logout', [UserController::class, 'logout']);
});
Route::post('/login', [UserController::class, 'login'])->middleware('guest');
Route::post('/register', [UserController::class, 'register'])->middleware('guest');
//Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);
Route::post('/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');