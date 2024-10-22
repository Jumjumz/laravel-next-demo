<?php

use App\Http\Controllers\LmscourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Lmscourse;

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
Route::post('/lmscourse/create', [LmscourseController::class, 'create' ]); // create courses
Route::get('sanctum/csrf-cookie', function (Request $request) {
    return response()->json(('CSRF Token'));
});
