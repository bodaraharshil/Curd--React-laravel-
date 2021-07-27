<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {


//     return $request->user();
// });

// Route::prefix('/user')->group( function(){
//     Route::post('login','App\Http\Controllers\Registers@login');
// } );

Route::post('adduser','App\Http\Controllers\Registers@save');
Route::get('alluser','App\Http\Controllers\Registers@show');
Route::get('deleteuser/{id}','App\Http\Controllers\Registers@delete');
Route::post('updateuser/{id}','App\Http\Controllers\Registers@update');
Route::post('login','App\Http\Controllers\Registers@login');
Route::get('logout','App\Http\Controllers\Registers@logout');
