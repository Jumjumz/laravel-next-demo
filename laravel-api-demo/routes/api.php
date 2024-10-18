<?php

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
    ]);

});