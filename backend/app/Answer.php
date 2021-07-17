<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['name','question_id','option_id'];

  public function question(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Question')->select('name','id');
  }
  public function option(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Option')->select('name','id');
  }
}
