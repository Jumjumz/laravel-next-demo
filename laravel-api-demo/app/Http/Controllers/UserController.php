<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index() {
        $users = User::all();
        return response()->json($users);
    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'Email' => 'required|string|unique:users|email|max:225',
            'Password' => 'required|string|max:10'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'Email' => $request->Email,
            'Password' => $request->Password,
        ]);

        return response()->json([
            'message' => 'User registered',
            'user'=> $user, 
        ], 201);

    }
}
