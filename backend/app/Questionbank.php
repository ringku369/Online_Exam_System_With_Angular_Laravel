<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questionbank extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['question_id','bank_id','user_id'];

  public function question(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Question')->select('name','id');
  }
  public function bank(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Bank')->select('name','id');
  }
}
