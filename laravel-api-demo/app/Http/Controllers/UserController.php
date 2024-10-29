<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function index(Request $request) {
        $credentials = $request->validate(['email' => 'required|email']);
        
        if (Auth::attempt($credentials)) {
            $users = User::all();
            return response()->json($users);
        }
    }

    public function users() {
        $users = User::all();
        
        return response()->json($users);
    }
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            
            return response()->json(['message' => __('Welcome')], 201);
        }
        
        throw ValidationException::withMessages([
            'email' => __('Invalid Credentials'),
        ]);

    }

    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|unique:users|email|max:225',
            'password' => 'required|string|max:10'
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return response()->json([
            'message' => 'User registered',
            'user'=> $user, 
        ], 201);

    }

    public function logout() {
        Auth::logout();

        return response()->json(['message' => 'Logged Out']);
    }
}
