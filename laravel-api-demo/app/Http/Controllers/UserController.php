<?php

namespace App\Http\Controllers;

use App\Events\UserOnline;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function users()
    {
        $users = User::all();

        return response()->json($users);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $email = $credentials['email'];
            $role = Auth::user();

            // broadcast(new UserOnline($email)); // laravel reverd config

            return response()->json(['email' => $email, 'role' => $role->role], 201);
        }

        throw ValidationException::withMessages([
            'email' => __('Invalid Credentials'),
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|unique:users|email|max:225',
            'password' => 'required|string|max:10'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role,
        ]);

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $email = $credentials['email'];

            return response()->json(['message' => 'User registered', 'email' => $email], 201);
        }


        throw ValidationException::withMessages([
            'email' => __('Invalid Credentials'),
        ]);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User Deleted'], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail(($id));

        $validate = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
        ]);

        $user->update($validate);

        return response()->json(['message' => 'Update Success', 'user' => $user], 200);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        // remove tokens and cookies in the server
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged Out']);
    }
}
