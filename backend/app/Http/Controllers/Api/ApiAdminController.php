<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

//use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Tmyon\JWTAuth\Facades\JWTAuth;

use Illuminate\Session\Middleware\StartSession;


use Redirect;
use Validator;
use Input;
use Session;
use Storage;
use File;
use DB;
use Mail;
use Auth;
use Cache;
use Carbon\Carbon;
//use Request;

use App\User;
use App\Bank;
use App\Question;
use App\Option;
use App\Answer;
use App\Exam;
use App\Questionbank;
use App\Examdata;
use App\Userexdata;
use App\Ansheet;




class ApiAdminController extends Controller
{
    
  public function __construct()
  {
    //date_default_timezone_set('America/New_York');
    //$this->middleware('auth:api', ['except' => ['login','test']]);
  }



  public function test()
  {
    return "This is test";
    //return route('api.login');
  }

  public function getBankForDD()
  {
    $query = Bank::select('id','name')->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data[] = [
      'value' => '0',
      'label' => 'Please Select Question Bank'
    ];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'value' => (string)$value['id'],
        'label' => $value['name']
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }


  public function getUserForDD()
  {
    $query = User::select('id','name')->where('level',100)->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data[] = [
      'value' => '0',
      'label' => 'Please Select User'
    ];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'value' => (string)$value['id'],
        'label' => $value['name']
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }

  

  
  // Bank crud area
  public function getBank()
  {

    $query = Bank::orderBy('id','asc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createBank(Request $request)
  {
    $rules  =  array(
      'name' => 'required'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $request['user_id'] = Auth::id();
    $bank = Bank::create($request->all());
    $returndata = ["Bank has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 
  }

  public function updateBank(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'name' => 'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $id = $request->get('id');
    $result = Bank::find($id);
    $result->name = $request->name;
    $result->save();
    //$update['name'] = $request->name;
    //$affected = DB::table('bankes')->where(['id'=>$request->id])->update($update);

    $returndata = ["Bank has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteBank($id)
  {
    $result = Bank::find($id);
    if ($result === null)
    {
      $returndata = ["There is no bank with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }


    $count = Questionbank::where('bank_id', $id)->count();
    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Exam::where('bank_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $result->delete();
    //$affected = DB::table('bankes')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }

  // Bank crud area




  // User crud area
  public function getUser()
  {

    $query = User::select('id','name','email','username','contact','profession','district','address','gender','balance','created_at','updated_at','acno')

      ->where(['level'=>100])
      ->orderBy('id','desc')
      ->get();
    $results = $query->toArray();

      /*$query = DB::table('users as t1')
                    ->select(
't1.id','t1.name','t1.email','t1.username','t1.contact','t1.profession','t1.district','t1.address','t1.type',
't1.gender','t1.rank_id','t1.bank_id','t1.balance','t1.created_at','t1.updated_at','t1.acno',
't2.name as rank','t3.name as bank','t4.name as branch'

                    )
                    ->join('ranks as t2', 't1.rank_id', '=', 't2.id')
                    ->join('banks as t3', 't1.bank_id', '=', 't3.id')
                    ->join('branches as t4', 't3.branch_id', '=', 't4.id')
                    ->where(['t1.level'=>100])
                    ->orderBy('t1.id','desc')
                    ->get();


    $results = json_decode(json_encode($query), True);*/

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createUser(Request $request)
  {

    //return $request->all();


    $rules  =  array(
      'name' => 'required|max:64',
      'email' => 'required|unique:users',
      'password' => 'required|confirmed|min:6',
      'contact' => 'required|max:16',
      'profession' => 'required|max:64',
      'district' => 'required|max:64',
      'gender' => 'required|max:16',
      'address' => 'required|max:256',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }


    $user = User::select('username')->orderBy('id','desc')->first();
    $ainid = $user->username + 1;
    $username = $ainid;

    $request['role'] = 'User';
    $request['level'] = 100;
    $request['username'] = $username;
    $request['acno'] = $username * 2;
    //$request['bank_id'] = $request->bank;
    //$request['rank_id'] = $request->rank;
    //$request['type'] = $request->type;
    $request['parent_id'] = Auth::id();
    $request['password'] = bcrypt($request['password']);
    $request['remember_token'] = bcrypt($request['_token']);
    //return $request->all();


    $user = User::create($request->all());
    $returndata = ["User has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 


  }


  public function updateUser(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'name' => 'required|max:64',
      //'email' => 'required|unique:users',
      'contact' => 'required|max:16',
      'profession' => 'required|max:64',
      'district' => 'required|max:64',
      'gender' => 'required|max:16',
      'address' => 'required|max:256'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $id = $request->get('id');
    $result = User::find($id);
    //$result->bank_id = $request->bank;
    //$result->rank_id = $request->rank;
    //$result->email = $request->email;
    $result->name = $request->name;
    $result->contact = $request->contact;
    $result->profession = $request->profession;
    $result->district = $request->district;
    $result->gender = $request->gender;
    $result->address = $request->address;
    //$result->type = $request->type;
    $result->save();
    //$update['name'] = $request->name;
    //$affected = DB::table('users')->where(['id'=>$request->id])->update($update);

    $returndata = ["User has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteUser($id)
  {
    $result = User::find($id);
    if ($result === null)
    {
      $returndata = ["There is no bank with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Question::where('user_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $result->delete();
    //$affected = DB::table('bankes')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }


  // User crud area



  // Teacher crud area
  public function getTeacher()
  {

    $query = User::select('id','name','email','username','contact','profession','district','address','gender','balance','created_at','updated_at','acno')

      ->where(['level'=>400])
      ->orderBy('id','desc')
      ->get();
    $results = $query->toArray();

      /*$query = DB::table('users as t1')
                    ->select(
't1.id','t1.name','t1.email','t1.username','t1.contact','t1.profession','t1.district','t1.address','t1.type',
't1.gender','t1.rank_id','t1.bank_id','t1.balance','t1.created_at','t1.updated_at','t1.acno',
't2.name as rank','t3.name as bank','t4.name as branch'

                    )
                    ->join('ranks as t2', 't1.rank_id', '=', 't2.id')
                    ->join('banks as t3', 't1.bank_id', '=', 't3.id')
                    ->join('branches as t4', 't3.branch_id', '=', 't4.id')
                    ->where(['t1.level'=>100])
                    ->orderBy('t1.id','desc')
                    ->get();


    $results = json_decode(json_encode($query), True);*/

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createTeacher(Request $request)
  {

    //return $request->all();


    $rules  =  array(
      'name' => 'required|max:64',
      'email' => 'required|unique:users',
      'password' => 'required|confirmed|min:6',
      'contact' => 'required|max:16',
      'profession' => 'required|max:64',
      'district' => 'required|max:64',
      'gender' => 'required|max:16',
      'address' => 'required|max:256',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }


    $user = User::select('username')->orderBy('id','desc')->first();
    $ainid = $user->username + 1;
    $username = $ainid;

    $request['role'] = 'Teacher';
    $request['level'] = 400;
    $request['username'] = $username;
    $request['acno'] = $username * 2;
    //$request['bank_id'] = $request->bank;
    //$request['rank_id'] = $request->rank;
    //$request['type'] = $request->type;
    $request['parent_id'] = Auth::id();
    $request['password'] = bcrypt($request['password']);
    $request['remember_token'] = bcrypt($request['_token']);
    //return $request->all();


    $user = User::create($request->all());
    $returndata = ["User has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 


  }


  public function updateTeacher(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'name' => 'required|max:64',
      //'email' => 'required|unique:users',
      'contact' => 'required|max:16',
      'profession' => 'required|max:64',
      'district' => 'required|max:64',
      'gender' => 'required|max:16',
      'address' => 'required|max:256'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $id = $request->get('id');
    $result = User::find($id);
    //$result->bank_id = $request->bank;
    //$result->rank_id = $request->rank;
    $result->name = $request->name;
    $result->contact = $request->contact;
    $result->profession = $request->profession;
    $result->district = $request->district;
    $result->gender = $request->gender;
    $result->address = $request->address;
    //$result->type = $request->type;
    $result->save();
    //$update['name'] = $request->name;
    //$affected = DB::table('users')->where(['id'=>$request->id])->update($update);

    $returndata = ["User has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteTeacher($id)
  {
    $result = User::find($id);
    if ($result === null)
    {
      $returndata = ["There is no bank with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Question::where('user_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $result->delete();
    //$affected = DB::table('bankes')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }


  // Teacher crud area






  public function getBalanceForAdmin()
  {

    $query = User::select('balance')->where(['id'=>Auth::id()])->first();
    $results = $query->toArray();


    

    $data = [
          'balance' => $results['balance'],
          'coin' => $results['balance'] * 10
        ];
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }


  public function getUserProfile(Request $request)
  {

    $id = $request->user_id;

    /*$queryResult = User::with('bank','rank')->where(['id'=>Auth::id()])->first();
    $results = $queryResult->toArray();*/


    $query = User::select('id','name','email','username','contact','profession','district','address','gender','balance','created_at','updated_at','acno','type')
      ->where(['id'=>$id])
      ->orderBy('id','desc')
      ->first();
    $results = $query->toArray();


    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }
  public function getSelfProfile()
  {

    $queryResult = User::where(['id'=>Auth::id()])->first();
    $results = $queryResult->toArray();
    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function putSelfPassword(Request $request)
  {

    $rules  =  array(
      //'current_password' => 'required||min:6',
      'password' => 'required|min:6',
      'confirm_password' => 'required|min:6|max:200|same:password',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $user = User::where(['id' => Auth::id()])->first();
    $name = $user->name;
    $email = $user->email;
    // verifycode
    $verifycode = mt_rand(100000, 999999);
    
    $repaly = self::sendMailToUserForVaryfi($verifycode, $email, $name);
    // verifycode
    
    $ses_arr = [
      'password' => $request->password,
      'verifycode' => $verifycode
    ];
   
    $returndata = ["Please check your email and user varification code to confirm fund transfer",$ses_arr];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }

  public function putSelfPasswordConfirmation(Request $request)
  {
    $rules  =  array(
      'password' => 'required|min:6'
    );

    $affected = DB::table('users')->where('id', Auth::id())->update(['password'=> bcrypt($request['password'])]);

    $returndata = ["Password has been updated successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 


  }
  public function putSelfProfile(Request $request)
  {

    $rules  =  array(
      'id' => 'required',
      'name' => 'required|max:64',
      //'email' => 'required|unique:users',
      'contact' => 'required|max:16',
      'profession' => 'required|max:64',
      'district' => 'required|max:64',
      'gender' => 'required|max:16',
      'address' => 'required|max:256',
      'bank' => 'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);
    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }


    $id = $request->get('id');
    $result = User::find($id);
    $result->bank_id = $request->bank;
    $result->name = $request->name;
    $result->contact = $request->contact;
    $result->profession = $request->profession;
    $result->district = $request->district;
    $result->gender = $request->gender;
    $result->address = $request->address;
    $result->save();


    $returndata = ["Profile has been updated successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);  
  }


  public function putSelfEmail(Request $request)
  {

    $rules  =  array(
      'id' => 'required',
      'email' => 'required|email|unique:users',
    );
    
    $validator = Validator::make( $request->all(),$rules);
    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }


    $id = $request->get('id');
    $result = User::find($id);
    $result->email = $request->email;
    $result->save();


    $returndata = ["Profile has been updated successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);  
  }




  public function getDashboardData()
  {

    $total_user_debit = 100;
    
    $total_debit = 100;
    $total_credit = 100;
    $balance = 0;

    $result['balance'] = $balance;
    $result['tcredit'] = $total_credit;
    $result['tdebit'] = $total_debit;

    $result['tselfdebit'] = $total_debit - $total_user_debit;
    $result['tuserdebit'] = $total_user_debit;

    
    
    

    return response()->json($result, 200,[],JSON_PRETTY_PRINT);

  }




  private function sendMailToUserForVaryfi($verifycode,$toemail,$toname){

    $emailInformation = array(
      'from' => 'vizzclub@gmail.com', 
      'from_name' => 'Message For OTP Code',
      'to' => $toemail,
      'to_name' => $toname,
    );

    $msgbody = "
      Hello {$toname} :)  
      Your varification code is {$verifycode}
    ";
    
    Mail::raw($msgbody, function ($message) use ($emailInformation) {
      $message->from($emailInformation['from'], $emailInformation['from_name']);
      $message->to($emailInformation['to'], $emailInformation['to_name']);
      $message->subject('Varification Message For Fund Transferring or Changing Password');
    });


  }













// Extra Code 



  // Question crud area
  
  
  public function getTeacherForDD()
  {
    $query = User::select('id','name')->where('level',400)->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data[] = [
      'value' => '0',
      'label' => 'Please Select Teacher'
    ];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'value' => (string)$value['id'],
        'label' => $value['name']
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }


  public function getQuestion()
  {

    $query = Question::with('user')->orderBy('id','desc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createQuestion(Request $request)
  {
    $rules  =  array(
      'name' => 'required',
      'user'=>'required',
      'user_id'=>'required',
      'mark'=>'required',
      'nmark'=>'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $question = Question::create($request->all());
    $returndata = ["Question has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 
  }

  public function updateQuestion(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'name' => 'required',
      'user'=>'required',
      'user_id'=>'required',
      'mark'=>'required',
      'nmark'=>'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $id = $request->get('id');
    $result = Question::find($id);
    $result->name = $request->name;
    $result->user_id = $request->user_id;
    $result->mark = $request->mark;
    $result->nmark = $request->nmark;
    $result->save();
    //$update['name'] = $request->name;
    //$affected = DB::table('questiones')->where(['id'=>$request->id])->update($update);

    $returndata = ["Question has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteQuestion($id)
  {
    $result = Question::find($id);
    if ($result === null)
    {
      $returndata = ["There is no question with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Option::where('question_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Answer::where('question_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Questionbank::where('question_id', $id)->count();
    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }


    $result->delete();
    //$affected = DB::table('questiones')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }

  // Question crud area



  // Option crud area
  
  public function getQuestionForDD()
  {
    $query = Question::select('id','name')->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data[] = [
      'value' => '0',
      'label' => 'Please Select Question'
    ];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'value' => (string)$value['id'],
        'label' => $value['name']
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }

  public function getOption()
  {

    $query = Option::with('question')->orderBy('id','asc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createOption(Request $request)
  {
    $rules  =  array(
      //'name' => 'required',
      'question'=>'required',
      'question_id'=>'required'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }


    //return $request->all();

    if (count($request['options']) == 0) {
      $messages = ["Please select option name"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }

    $request['question_id'] = $request['question_id'];
    foreach ($request['options'] as $value) {
      $request['name'] = $value['name'];
      $option = Option::create($request->all());
    }


    
    $returndata = ["Option has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 
  }

  public function updateOption(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'question'=>'required',
      'question_id'=>'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $id = $request->get('id');
    $result = Option::find($id);


    if (count($request['options']) == 0) {
      $messages = ["Please select question"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }

    if (count($request['options']) == 0) {
      $messages = ["Please select option name"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }




    foreach ($request['options'] as $value) {
      $result->name = $value['name'];
      $result->save();
    }

    $returndata = ["Option has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteOption($id)
  {
    $result = Option::find($id);
    if ($result === null)
    {
      $returndata = ["There is no option with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Answer::where('option_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $result->delete();
    //$affected = DB::table('optiones')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }



  // Option crud area


  // Answer crud area
  
  public function getOptionForDD()
  {
    $query = Option::select('id','name')->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data[] = [
      'value' => '0',
      'label' => 'Please Select Option'
    ];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'value' => (string)$value['id'],
        'label' => $value['name']
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }
  public function getOptionForDDWithID($id)
  {
    $query = Option::select('id','name')->where(['question_id'=>$id])->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data[] = [
      'value' => '0',
      'label' => 'Please Select Option'
    ];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'value' => (string)$value['id'],
        'label' => $value['name']
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }

  public function getAnswer()
  {

    $query = Answer::with('question','option')->orderBy('id','asc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createAnswer(Request $request)
  {
    $rules  =  array(
      //'name' => 'required',
      'question'=>'required',
      'question_id'=>'required',
      'option'=>'required',
      'option_id'=>'required'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $count = Answer::where(['question_id'=>$request['question_id'],'option_id'=>$request['option_id']])->count();
    if ($count == 0) {
      $answer = Answer::create($request->all());
    }
    
    $returndata = ["Answer has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 
  }

  public function updateAnswer(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      //'name' => 'required',
      'question'=>'required',
      'question_id'=>'required',
      'option'=>'required',
      'option_id'=>'required'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    //return $request->all();

    $id = $request->get('id');
    $result = Answer::find($id);
    //$result->name = $request->name;
    $result->question_id = $request->question;
    $result->option_id = $request->option;
    $result->save();
    //$update['name'] = $request->name;
    //$affected = DB::table('answeres')->where(['id'=>$request->id])->update($update);

    $returndata = ["Answer has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteAnswer($id)
  {
    $result = Answer::find($id);
    if ($result === null)
    {
      $returndata = ["There is no answer with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    /*$count = Answer::where('answer_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }*/

    $result->delete();
    //$affected = DB::table('answeres')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }

  // Answer crud area




  // Question bank crud area
  public function getQuestionForUIL()
  {
    $query = Question::select('id','name')->orderBy('id','asc')->get();
    $queryResult = $query->toArray();

    $data = [];
    foreach ($queryResult as $key => $value) {
      
      $data[] = [
        'id' => $value['id'],
        'value' => $value['name'],
        'isSelected' => false
      ];
    }
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }


  public function getQBankMapping()
  {

    $query = Questionbank::with('question','bank')->orderBy('id','asc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }


  public function creatQBankMapping(Request $request)
  {
    $rules  =  array(
      'bank'=>'required',
      'bank_id'=>'required'
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    if (count($request['checkedList']) == 0) {
      $messages = ["Please select question"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }
  

    /*$count = Exam::where(['id'=>$request->get('bank_id'), 'status'=>1])->count();
    if ($count > 0)
    {
      $returndata = ["This process can not continued due to exam running session"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }*/

    $affected = DB::table('questionbanks')->where(['bank_id'=>$request->bank_id, 'user_id'=>Auth::id() ])->delete();



    //return $request->checkedList;
    //return $request['checkedList'];
    //return $request->all();
    $bank_id = $request['bank_id'];
    $request['bank_id'] = $bank_id;
    foreach ($request['checkedList'] as $value) {
      $question_id = $value['id'];
      $request['question_id'] = $question_id;
      $count = Questionbank::where(['question_id'=>$question_id,'bank_id'=>$bank_id])->count();
      if ($count == 0) {
        $request['user_id'] = Auth::id();
        $result = Questionbank::create($request->all());
      }
    }
    $returndata = ["Questionbank has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 
  }


  public function deleteQBankMapping($id)
  {
    $result = Questionbank::find($id);
    if ($result === null)
    {
      $returndata = ["There is no exam with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Exam::where(['id'=>$id, 'status'=>1])->count();
    if ($count > 0)
    {
      $returndata = ["This process can not continued due to exam running session"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }


    $result->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }

  
  // Question bank crud area
  
  // Mapped question bank crud area
  public function getMappedQBank()
  {

    $query = Bank::with('question')->orderBy('id','asc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }



  // Mapped question bank crud area
  


  // Exam crud area
  public function getExam()
  {

    $query = Exam::with('bank')->orderBy('id','desc')->get();
    $results = $query->toArray();

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }

  public function createExam(Request $request)
  {
    $rules  =  array(
      'name' => 'required',
      'bank'=>'required',
      'bank_id'=>'required',
      'etime'=>'required',
      'type'=>'required',
      'isnegetive'=>'required',
      'fdate'=>'required',
      'duration'=>'required',
      'note'=>'required',
    );

    $request['user_id'] = Auth::id();
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }


    //return $request->all();
    $request['user_id'] = Auth::id();
    $request['examdate'] = $request['fdate'];
    $request['examtime'] = $request['etime'];
    $request['datetime'] = $request['fdate'] . " " .$request['etime'];
    $request['type'] = $request['type'];
    $request['isnegetive'] = $request['isnegetive'];

    $exam = Exam::create($request->all());
    $returndata = ["Exam has been created successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT); 
  }

  public function updateExam(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'name' => 'required',
      'bank'=>'required',
      'bank_id'=>'required',
      'etime'=>'required',
      'type'=>'required',
      'isnegetive'=>'required',
      'fdate'=>'required',
      'duration'=>'required',
      'note'=>'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $count = Exam::where(['id'=>$request->get('id'), 'status'=>1])->count();
    if ($count > 0)
    {
      $returndata = ["This data can not be updated due to exam running session"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }




    $id = $request->get('id');
    $result = Exam::find($id);
    $result->name = $request->name;
    $result->bank_id = $request->bank_id;
    $result->examdate = $request->fdate;
    $result->examtime = $request->etime;
    $result->datetime = $request->fdate . " " .$request->etime;
    $result->type = $request->type;
    $result->isnegetive = $request->isnegetive;
    $result->duration = $request->duration;
    $result->note = $request->note;
    $result->save();
    //$update['name'] = $request->name;
    //$affected = DB::table('exames')->where(['id'=>$request->id])->update($update);

    $returndata = ["Exam has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }


  public function deleteExam($id)
  {
    $result = Exam::find($id);
    if ($result === null)
    {
      $returndata = ["There is no exam with this id"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $count = Userexdata::where('exam_id', $id)->count();

    if ($count > 0)
    {
      $returndata = ["This data can not be deleted due to related with other data"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }

    $result->delete();
    //$affected = DB::table('exames')->where(['id'=>$request->id])->delete();
    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }



  public function changeExamStatus(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'status' => 'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $id = $request->get('id');
    $result = Exam::find($id);
    if ($request->status == 0) {
      $result->status = 1;
    }else{
      $result->status = 0;
    }
    $result->save();

    $returndata = ["Exam has been update successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);

  }

  // Exam crud area

  // Mapped bank bank crud area
  public function getMappedExamBank($id)
  {
    //return $id;
    $query = Bank::with('question')->where(['id'=>$id])->orderBy('id','asc')->get();
    $results = $query->toArray();

    

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }



  // Mapped bank bank crud area

  // Mapped exam start crud area
  
  public function putCacheData(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      'status' => 'required'

    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $sdata = [
      'id'=>$request->id,
      'status'=>$request->status,
    ];

    $expiresAt = Carbon::now()->addSecond(20);
    Cache::put(Auth::id(), Auth::id(), $expiresAt);
    $messages = ["Session has been created successfully"];
    return response()->json($messages,200,[],JSON_PRETTY_PRINT);

    return response()->json($sdata,200,[],JSON_PRETTY_PRINT);

  }


  public function getCacheData()
  {

    if (!Cache::has(Auth::id()))
    {
      $messages = ["Session has been destroyed successfully"];
      return response()->json($messages,200,[],JSON_PRETTY_PRINT);
      
    }else{
      $results = Cache::get(Auth::id());
      return response()->json($results,200,[],JSON_PRETTY_PRINT);
    }
    
  }

  public function forgetCacheData(Request $request)
  {
    Cache::flush();
    $messages = ["Session has been destroyed successfully"];
    return response()->json($messages,200,[],JSON_PRETTY_PRINT);
  }


  public function getActiveExam()
  {
    $query = Exam::with('bank')->where(['status'=>1])->orderBy('id','desc')->get();
    $results = $query->toArray();
    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }



  public function getExamQuestionData(Request $request)
  {

    $rules  =  array(
      'id' => 'required',
      'bank_id' => 'required',
      'isnegetive' => 'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    $exam_id = $request->id;
    $bank_id = $request->bank_id;
    $duration = $request->duration;
    $isnegetive = $request->isnegetive;

    //for security
    $query = DB::table('questionbanks as t1')
          ->select('t3.name as question', 't3.id as question_id','t3.mark as mark','t3.nmark as nmark')
          ->join('banks as t2', 't2.id', '=', 't1.bank_id')
          ->join('questions as t3', 't3.id', '=', 't1.question_id')
          ->where(['t2.id'=>$bank_id])
          ->orderBy('t3.id','asc')
          ->get();
    $questions = json_decode(json_encode($query), True);


    if (count($questions) == 0)
    {
      $messages = ["There is no question found in this question bank, please map question bank before "];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }
    //for security




    $count = Userexdata::where(['exam_id'=>$exam_id, 'user_id'=>Auth::id()])->count();

    if ($count > 0 ) {
     
      if (!Cache::has(Auth::id()))
      {
        $messages = ["you have already given this exam text, you not eligible for this exam again more"];
        return response()->json($messages,400,[],JSON_PRETTY_PRINT);
      }
    }


    //return $request->all();

    

    $query = DB::table('questionbanks as t1')
          ->select('t3.name as question', 't3.id as question_id','t3.mark as mark','t3.nmark as nmark')
          ->join('banks as t2', 't2.id', '=', 't1.bank_id')
          ->join('questions as t3', 't3.id', '=', 't1.question_id')
          ->where(['t2.id'=>$bank_id])
          ->orderBy('t3.id','asc')
          ->get();
    $questions = json_decode(json_encode($query), True);


    $results = [];

    foreach ($questions as $question) {
      $question['question'] = $question['question'];
      $question['question_id'] = $question['question_id'];
      $question['mark'] = $question['mark'];
      $question['nmark'] = $question['nmark'];

      $question_id = $question['question_id'];

      $query = Option::where(['question_id'=>$question_id])->get();
      $options = $query->toArray();

      foreach ($options as $option) {

        $question['option'][] = [
          'user_id'=> Auth::id(),
          'exam_id'=>$exam_id,
          'bank_id'=>$bank_id,
          'question_id'=>$question_id,
          'option_id'=>$option['id'],
          'option'=>$option['name'],
        ];
        
      }

      $results[] = $question;

    }
    //Exam time restriction
    if (!Cache::has(Auth::id()))
    {

      $request['user_id'] = Auth::id();
      $request['exam_id'] = $request['id'];
      Userexdata::create($request->all());


      $time = ((int)$duration * 60);
      $expiresAt = Carbon::now()->addSecond($time);
      Cache::put(Auth::id(), Auth::id(), $expiresAt);
      
    }

    //Exam time restriction

    return response()->json($results,200,[],JSON_PRETTY_PRINT);
  }



  public function postExamQuestionData(Request $request)
  {

    //return $request->all();
    //Exam time restriction
    
    if (!Cache::has(Auth::id()))
    {
      $messages = ["You are not eligible to submit exam date due to time exceeded"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }
    //Exam time restriction

    if (count($request['examdata']) == 0) {
      $messages = ["Please make answer at list one question"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }

    $exam_id = 0;
    foreach ($request['examdata'] as $value) {
      $exam_id = $value['exam_id'];
    }

    $affected = DB::table('examdatas')->where(['exam_id'=>$exam_id, 'user_id'=>Auth::id()])->delete();
    $count = Examdata::where(['exam_id'=>$exam_id, 'user_id'=>Auth::id()])->count();
    if ($count > 0 ) {
     
      $messages = ["You have already sent this exam data"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }
    foreach ($request['examdata'] as $value) {

      $request['user_id'] = Auth::id();
      $request['exam_id'] = $value['exam_id'];
      $request['bank_id'] = $value['bank_id'];
      $request['question_id'] = $value['question_id'];
      $request['option_id'] = $value['option_id'];

      $option = Examdata::create($request->all());
    }

    Cache::flush();
    $messages = ["Data has been stored successfully, please wait for result"];
    return response()->json($messages,200,[],JSON_PRETTY_PRINT);
  }



  public function makeExamQuestionAnSheet(Request $request){

    $rules  =  array(
      'id' => 'required',
      //'user_id' => 'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    //return $request->all();

    $exam_id = $request->id;
    $user_id = Auth::id();

    $count = Userexdata::where(['user_id'=>Auth::id(), 'status'=> 0, 'exam_id'=>$exam_id ])->orderBy('id','desc')->count();

    if ($count == 0) {
      $messages = ["Requested answer sheet has already been made"];
      return response()->json($messages,400,[],JSON_PRETTY_PRINT);
    }

    $examdata = Exam::where(['id'=>$exam_id ])->orderBy('id','asc')->first();
    $bank_id = $examdata->bank_id;
    
    //Update prerequisite
    $affected = DB::table('ansheets')->where(['user_id'=>Auth::id(),'exam_id'=>$exam_id])->delete();
    $query = Question::orderBy('id','asc')->get();
    $qestions = $query->toArray();
    foreach ($qestions as $key => $qestion) {
      $question_id = $qestion['id'];
      $count = Answer::where(['question_id'=>$question_id])->count();
      if ($count > 0 ) {
        $affected = DB::table('questions')->where(['id'=>$question_id])->update(['tac'=>$count]);
      }
    }

    //Update prerequisite
    $userexdata = Userexdata::where(['user_id'=>Auth::id(), 'status'=> 0, 'exam_id'=>$exam_id ])->orderBy('id','desc')->first();

    $userexdata_id = $userexdata->id;
    $isnegetive = $userexdata->isnegetive;


    $margedata = [];
    $exdata = [];
    $andata = [];

    /*$query = Question::orderBy('id','asc')->get();
    $qestions = $query->toArray();*/

    $query = DB::table('questionbanks as t1')
          ->select('t3.id as id','t3.name as question', 't3.id as question_id','t3.mark as mark',
            't3.nmark as nmark','t3.tac as tac')
          ->join('banks as t2', 't2.id', '=', 't1.bank_id')
          ->join('questions as t3', 't3.id', '=', 't1.question_id')
          ->where(['t2.id'=>$bank_id])
          ->orderBy('t3.id','asc')
          ->get();
    $qestions = json_decode(json_encode($query), True);



    foreach ($qestions as $key => $qestion) {
      $question_id = $qestion['id'];
      $tac = $qestion['tac'];
      $mark = $qestion['mark'];
      $nmark = $qestion['nmark'];

      

      $count = Examdata::where(['user_id'=>Auth::id(),'exam_id'=>$exam_id,'question_id'=>$question_id])->count();

      if ($count == 0) {
        $request['user_id'] = Auth::id();
        $request['exam_id'] = $exam_id;
        $request['question_id'] = $question_id;
        if ($isnegetive == 'true') {
          $request['mark'] = (0 - (float)$nmark);
        }else{
          $request['mark'] = 0;
        }
        Ansheet::create($request->all());
      }else{
        // result sheet making
        
        if ($count != $tac) {
          $request['user_id'] = Auth::id();
          $request['exam_id'] = $exam_id;
          $request['question_id'] = $question_id;

          if ($isnegetive == 'true') {
            $request['mark'] = (0 - (float)$nmark);
          }else{
            $request['mark'] = 0;
          }
          
          Ansheet::create($request->all());
        }else{
          // Cross match with answers table
          
          $query = Examdata::select('question_id','option_id')->where(['user_id'=>Auth::id(),'exam_id'=>$exam_id,'question_id'=>$question_id])->orderBy('option_id','asc')->get();
          $examdatas = $query->toArray();
          $exdata[] = $examdatas;

          $query = Answer::select('question_id','option_id')->where(['question_id'=>$question_id])->orderBy('option_id','asc')->get();
          $answerdatas = $query->toArray();
          $andata[] = $answerdatas;
        }
      }

    }
    

    foreach ($andata as $key => $ans) {
      $question_id = 0;
      $i = 1;

      foreach ($ans as $key1 => $ansvalue) {
        if ($ansvalue['question_id'] == $exdata[$key][$key1]['question_id'] && $ansvalue['option_id'] == $exdata[$key][$key1]['option_id']) {
          $question_id = $ansvalue['question_id'];
        }else{
          $question_id = $ansvalue['question_id'];
          $i = 0;
        }

      }

      if ($i == 1) {
        $query = Question::select('mark','nmark')->where('id',$question_id)->first();
        $mark = $query->mark;
        $nmark = $query->nmark;

        $request['user_id'] = Auth::id();
        $request['exam_id'] = $exam_id;
        $request['question_id'] = $question_id;
        $request['mark'] = $mark;
        Ansheet::create($request->all());
      }else{
        $query = Question::select('mark','nmark')->where('id',$question_id)->first();
        $mark = $query->mark;
        $nmark = $query->nmark;

        $request['user_id'] = Auth::id();
        $request['exam_id'] = $exam_id;
        $request['question_id'] = $question_id;
        if ($isnegetive == 'true') {
          $request['mark'] = (0 - (float)$nmark);
        }else{
          $request['mark'] = 0;
        }
        Ansheet::create($request->all());
      }
    }

    $result = Userexdata::find($userexdata_id);
    $result->status = 1;
    $result->save();
    $messages = ["Answer sheet has being made successfully"];
    return response()->json($messages,200,[],JSON_PRETTY_PRINT);

  }



  public function getExamAnsSheet(Request $request)
  {
    $rules  =  array(
      'id' => 'required',
      //'user_id' => 'required',
    );
    
    $validator = Validator::make( $request->all(),$rules);

    if ($validator->fails())
    {
      $messages = $validator->errors();
      return response()->json($messages->all(),400,[],JSON_PRETTY_PRINT);
    }

    //return $request->all();

    $exam_id = $request->id;
    $user_id = Auth::id();


    $query = Ansheet::with('user','exam','question')->where(['user_id'=>Auth::id(),'exam_id'=>$exam_id])->orderBy('question_id','asc')->get();
    $results = $query->toArray();
    return response()->json($results,200,[],JSON_PRETTY_PRINT);

  }



  public function userExdata($id)
  {

    $exam_id = $id;
    $user_id = Auth::id();

    $count =  Userexdata::where(['exam_id'=>$exam_id,'user_id'=>$user_id])->count();
    
    if ($count == 0 ) {
      $returndata = ["There is no data with this exam"];
      return response()->json($returndata, 400,[],JSON_PRETTY_PRINT);
    }


    $affected = DB::table('ansheets')->where(['exam_id'=>$exam_id,'user_id'=>$user_id])->delete();
    $affected = DB::table('examdatas')->where(['exam_id'=>$exam_id,'user_id'=>$user_id])->delete();
    $affected = DB::table('userexdatas')->where(['exam_id'=>$exam_id,'user_id'=>$user_id])->delete();


    $returndata = ["Congratulations ! Data has been deleted successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);
    
  }

  // Mapped exam start crud area



  // Examresult crud area
  public function getExamresult()
  {

    //$query = Exam::with('bank')->orderBy('id','desc')->get();
    //$results = $query->toArray();
    

    $query = DB::table('exams as t1')
          ->select('t1.id','t1.name','t1.isnegetive','t1.type','t1.duration','t1.examdate',
            't2.created_at','t2.user_id','t3.name as bank')
          ->join('userexdatas as t2', 't1.id', '=', 't2.exam_id')
          ->join('banks as t3', 't3.id', '=', 't1.bank_id')
          ->where(['t2.user_id'=>Auth::id()])
          ->orderBy('t1.id','desc')
          ->get();
    $results = json_decode(json_encode($query), True);

    return response()->json($results,200,[],JSON_PRETTY_PRINT);

  }

  
  // Examresult crud area

}
