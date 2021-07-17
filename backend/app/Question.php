<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['name','user_id','mark','nmark'];

  public function user(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\User')->select('name','id','username','email');
  }


  public function option(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Option');
  }

  public function bank(){
    //return $this->hasMany('\App\Product');
    return $this->belongsToMany('\App\Bank','questionbanks');
  }

}
