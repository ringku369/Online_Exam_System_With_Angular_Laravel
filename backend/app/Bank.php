<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['name','user_id'];

  public function question(){
    //return $this->hasMany('\App\Product');
    return $this->belongsToMany('\App\Question','questionbanks');
  }
}
