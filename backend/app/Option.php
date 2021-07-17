<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['name','question_id'];

  public function Question(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Question')->select('name','id','mark','nmark');
  }
}
