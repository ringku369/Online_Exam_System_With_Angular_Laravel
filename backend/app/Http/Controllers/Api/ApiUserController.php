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




class ApiUserController extends Controller
{
    
  // Common method area

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

  
  public function getBalanceForUser()
  {

    $query = User::select('balance')->where(['id'=>Auth::id()])->first();
    $results = $query->toArray();

    $data = [
          'balance' => $results['balance'],
          'coin' => $results['balance'] * 10
        ];
    return response()->json($data,200,[],JSON_PRETTY_PRINT);
  }


  public function getSelfProfile()
  {

    $queryResult = User::select('name','email','username','contact','profession','district','address','gender')->where(['id'=>Auth::id()])->first();
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
      'name' => 'required|max:64',
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

    //return $request->all();


    $id = Auth::id();
    $result = User::find($id);
    //$result->bank_id = $request->bank;
    $result->name = $request->name;
    $result->contact = $request->contact;
    $result->profession = $request->profession;
    $result->district = $request->district;
    $result->gender = $request->gender;
    $result->address = $request->address;
    $result->save();
    //$affected = DB::table('users')->where('id', Auth::id())->update($request->all());


    $returndata = ["Profile has been updated successfully"];
    return response()->json($returndata, 200,[],JSON_PRETTY_PRINT);  
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

  public function getDashboardData()
  {

    $total_debit = 100;
    $total_credit = 100;
    $balance = 0;

    $result['balance'] = $balance;
    $result['tcredit'] = $total_credit;
    $result['tdebit'] = $total_debit;
    
    return response()->json($result, 200,[],JSON_PRETTY_PRINT);

  }

  // Common method area




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

    /*$query = Exam::with('bank')->orderBy('id','desc')->get();
    $results = $query->toArray();*/

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
