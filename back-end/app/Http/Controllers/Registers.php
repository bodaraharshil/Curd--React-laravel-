<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\signup;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Registers extends Controller
{
    public $successStatus = 200;

    /***all user show***/

    function show(Request $request)
    {
        $data = signup::all();
        return $data;
    }

    /***new user add***/

    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'user_name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }
        $input = $request->all();
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('uploads', $filename);
            $input['photo'] = $filename;
        } else {
            return $request;
            $input['photo'] = '';
        }
        $input['password'] = bcrypt($input['password']);
        $user = signup::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['user_name'] =  $user->user_name;
        return response()->json(['success' => $success], $this->successStatus);
    }

    public function login()
    {
        if (Auth::attempt(['user_name' => request('user_name'), 'password' => request('password')])) {
            $user = Auth::user();
            $success =  $user->createToken('authToken')->accessToken;
            return response()->json( ['user'=>$user,'token' => $success] , $this->successStatus);
        } else {
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    /***delete user***/

    function delete($id)
    {
        $data = DB::delete('delete from signups where id = ?', [$id]);
        if ($data) {
            echo "user deleted";
        } else {
            echo "something went wrong";
        }
    }

    /***update user data***/

    function update(Request $request, $id)
    {
        $data = new signup();
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $user_name = $request->input('user_name');
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move('uploads/', $filename);
            $data = $filename;
        } else {
            return $request;
            $data->photo = '';
        }
        $query = DB::update('update signups set first_name = ?,last_name = ?,email = ?,user_name = ?,photo = ? where id = ?', [$first_name, $last_name, $email, $user_name, $data, $id]);
        echo $query;
    }
}
