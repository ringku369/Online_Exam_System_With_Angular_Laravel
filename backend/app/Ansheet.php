<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ansheet extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['user_id','exam_id','question_id','mark'];
  
  public function user(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\User')->select('name','id');
  }

  public function exam(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Exam')->select('name','id');
  }

  public function question(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Question')->select('name','id','mark','nmark');
  }
}
