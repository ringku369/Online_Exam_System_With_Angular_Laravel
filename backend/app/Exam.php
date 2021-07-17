<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['name','bank_id','examdate','examtime','datetime','duration','type','isnegetive','note','user_id'];

  public function bank(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Bank')->select('name','id');
  }
}

