<?php

namespace App\Http\Controllers;

use App\Models\Lmscourse;

//use Illuminate\Http\Request;

class LmscourseController extends Controller
{
    public function index() {
        $lmscourses = Lmscourse::all();
        return response()->json($lmscourses);
    }
}
