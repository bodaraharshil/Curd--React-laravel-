<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class register extends Model
{
    use HasFactory;
    protected $fillable = ['First_name,Last_name,Email,User_name','Photo','Password'];
    public $timestamps = false;
}
