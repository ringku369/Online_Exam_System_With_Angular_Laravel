<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Userexdata extends Model
{
   //protected $fillable = []
  //protected $guarded = []
	public $timestamps = true;

  //protected table = 'tbl_user';
  //protected $primaryKey = 'user_id';
  
  protected $fillable = ['exam_id','bank_id','user_id','examdate','examtime','datetime','duration','type','isnegetive'];

  public function bank(){
    //return $this->hasMany('\App\Product');
    return $this->belongsTo('\App\Bank')->select('name','id');
  }
}
