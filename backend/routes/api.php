<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//https://drive.google.com/file/d/1a1xoFqlh2WdqAc9PBaENNI74TJuTurQK/view?usp=sharing


/*INSERT INTO `users` (`id`, `username`, `name`, `email`, `contact`, `balance`, `email_verified_at`, `password`, `remember_token`, `level`, `role`, `status`, `active`, `_lft`, `_rgt`, `parent_id`, `refer_id`, `position`, `isposition`, `ismatch`, `gencount`, `created_at`, `updated_at`) VALUES
(1, '1000', 'Vizz BD', 'ringku369@gmail.com', '01712616057', 20020.5, NULL, '$2y$10$vm/Gilvvl5RhENm.azh4AuLbF1kGyoX8nOnxLmbjBBPnzug2/AXXW', '$2y$10$RNXT6oJ74YOnD3u47gQ/jOsZHCO7QXuhd969g1AfP.sYHxfx167HW', 1000, 'Superadmin', 1, 1, 1, 136, NULL, NULL, 0, 'N', 1, 0, '2021-02-21 10:26:06', '2021-02-21 10:33:05');

INSERT INTO `profits` (`id`, `user_id`, `ds_id`, `ids_id`, `child_id`, `mt_id`, `to_id`, `amount`, `status`, `iscount`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, NULL, 1, NULL, NULL, 0.5, 1, 1, '2021-02-21 08:50:03', '2021-02-21 08:50:03'),
(2, 1, NULL, NULL, 1, NULL, 1, 20020, 6, 1, '2021-02-21 04:57:47', '2021-02-21 04:57:47');

INSERT INTO `vcfunds` (`id`, `user_id`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2021-02-21 08:50:03', '2021-02-21 08:50:03'),
(2, 1, 1, 2, '2021-02-21 08:50:03', '2021-02-21 08:50:03');*/




#userfunds
// 1=FCA(From Create Acc), 2=FFT(From Fund Transfer)

#profits
//1=OB(Opening Balance),2=DS(Direct Sponsor),3=IDS(Indirect Sponsor),4=MT(Binary Matching),
//5=GEN(Renak Income),6=FFT(From Fund Transfer), 7 = VCIN (VixxClub Incentive)

#vcfunds
//1=FOP,VCIN(From Ipening Amount),2=FRA(From Rank Fund) 



Route::group([
  'middleware' => ['auth:api','RoleAuth:Admin','CORS'],
  //'prefix' => 'auth',
  'namespace' => 'Api'
], function () {

  Route::get('admin/getBalanceForAdmin', ['as'=>'api.getBalanceForAdmin','uses'=>'ApiAdminController@getBalanceForAdmin']);
  Route::get('admin/getDashboardData', ['as'=>'api.getDashboardData','uses'=>'ApiAdminController@getDashboardData']);
  
  Route::get('admin/getUserForDD', ['as'=>'api.getUserForDD','uses'=>'ApiAdminController@getUserForDD']);
  Route::get('admin/getBankForDD', ['as'=>'api.getBankForDD','uses'=>'ApiAdminController@getBankForDD']);
  
  Route::get('admin/getSelfProfile', ['as'=>'api.getSelfProfile','uses'=>'ApiAdminController@getSelfProfile']);
  Route::put('admin/putSelfProfile', ['as'=>'api.putSelfProfile','uses'=>'ApiAdminController@putSelfProfile']);
  Route::put('admin/putSelfEmail', ['as'=>'api.putSelfEmail','uses'=>'ApiAdminController@putSelfEmail']);
  Route::post('admin/putSelfPassword', ['as'=>'api.putSelfPassword','uses'=>'ApiAdminController@putSelfPassword']);
  Route::post('admin/putSelfPasswordConfirmation', ['as'=>'api.putSelfPasswordConfirmation','uses'=>'ApiAdminController@putSelfPasswordConfirmation']);    
    
  Route::post('admin/getUserProfile', ['as'=>'api.getUserProfile','uses'=>'ApiAdminController@getUserProfile']);
    
  // Student crud area
  Route::get('admin/getUser', ['as'=>'api.getUser','uses'=>'ApiAdminController@getUser']);
  Route::post('admin/createUser', ['as'=>'api.createUser','uses'=>'ApiAdminController@createUser']);
  Route::put('admin/updateUser', ['as'=>'api.updateUser','uses'=>'ApiAdminController@updateUser']);
  Route::delete('admin/deleteUser/{id}', ['as'=>'api.deleteUser','uses'=>'ApiAdminController@deleteUser'])->where(['id' => '[0-9]+']);
  // Student crud area
  
  // Teacher crud area
  Route::get('admin/getTeacher', ['as'=>'api.getTeacher','uses'=>'ApiAdminController@getTeacher']);
  Route::post('admin/createTeacher', ['as'=>'api.createTeacher','uses'=>'ApiAdminController@createTeacher']);
  Route::put('admin/updateTeacher', ['as'=>'api.updateTeacher','uses'=>'ApiAdminController@updateTeacher']);
  Route::delete('admin/deleteTeacher/{id}', ['as'=>'api.deleteTeacher','uses'=>'ApiAdminController@deleteTeacher'])->where(['id' => '[0-9]+']);
  // Teacher crud area


  // Bank crud area
  Route::get('admin/getBank', ['as'=>'api.getBank','uses'=>'ApiAdminController@getBank']);
  Route::post('admin/createBank', ['as'=>'api.createBank','uses'=>'ApiAdminController@createBank']);
  Route::put('admin/updateBank', ['as'=>'api.updateBank','uses'=>'ApiAdminController@updateBank']);
  Route::delete('admin/deleteBank/{id}', ['as'=>'api.deleteBank','uses'=>'ApiAdminController@deleteBank'])->where(['id' => '[0-9]+']);
  // Bank crud area
 
 // Question crud area
  Route::get('admin/getTeacherForDD', ['as'=>'api.getTeacherForDD','uses'=>'ApiAdminController@getTeacherForDD']);
  Route::get('admin/getQuestion', ['as'=>'api.getQuestion','uses'=>'ApiAdminController@getQuestion']);
  Route::post('admin/createQuestion', ['as'=>'api.createQuestion','uses'=>'ApiAdminController@createQuestion']);
  Route::put('admin/updateQuestion', ['as'=>'api.updateQuestion','uses'=>'ApiAdminController@updateQuestion']);
  Route::delete('admin/deleteQuestion/{id}', ['as'=>'api.deleteQuestion','uses'=>'ApiAdminController@deleteQuestion'])->where(['id' => '[0-9]+']);
 // Question crud area

  
 // Option crud area
  Route::get('admin/getQuestionForDD', ['as'=>'api.getQuestionForDD','uses'=>'ApiAdminController@getQuestionForDD']);
  Route::get('admin/getOption', ['as'=>'api.getOption','uses'=>'ApiAdminController@getOption']);
  Route::post('admin/createOption', ['as'=>'api.createOption','uses'=>'ApiAdminController@createOption']);
  Route::put('admin/updateOption', ['as'=>'api.updateOption','uses'=>'ApiAdminController@updateOption']);
  Route::delete('admin/deleteOption/{id}', ['as'=>'api.deleteOption','uses'=>'ApiAdminController@deleteOption'])->where(['id' => '[0-9]+']);
 // Option crud area

 // Answer crud area
  Route::get('admin/getOptionForDD', ['as'=>'api.getOptionForDD','uses'=>'ApiAdminController@getOptionForDD']);
  Route::get('admin/getOptionForDDWithID/{id}', ['as'=>'api.getOptionForDDWithID','uses'=>'ApiAdminController@getOptionForDDWithID'])->where(['id' => '[0-9]+']);
  Route::get('admin/getAnswer', ['as'=>'api.getAnswer','uses'=>'ApiAdminController@getAnswer']);
  Route::post('admin/createAnswer', ['as'=>'api.createAnswer','uses'=>'ApiAdminController@createAnswer']);
  //Route::put('admin/updateAnswer', ['as'=>'api.updateAnswer','uses'=>'ApiAdminController@updateAnswer']);
  Route::delete('admin/deleteAnswer/{id}', ['as'=>'api.deleteAnswer','uses'=>'ApiAdminController@deleteAnswer'])->where(['id' => '[0-9]+']);
 // Answer crud area



// Question bank crud area
  Route::get('admin/getQuestionForUIL', ['as'=>'api.getQuestionForUIL','uses'=>'ApiAdminController@getQuestionForUIL']);
  Route::get('admin/getQBankMapping', ['as'=>'api.getQBankMapping','uses'=>'ApiAdminController@getQBankMapping']);
  Route::post('admin/creatQBankMapping', ['as'=>'api.creatQBankMapping','uses'=>'ApiAdminController@creatQBankMapping']);
  Route::delete('admin/deleteQBankMapping/{id}', ['as'=>'api.deleteQBankMapping','uses'=>'ApiAdminController@deleteQBankMapping'])->where(['id' => '[0-9]+']);

// Question bank crud area

// Mapped question bank crud area
  
  Route::get('admin/getMappedQBank', ['as'=>'api.getMappedQBank','uses'=>'ApiAdminController@getMappedQBank']);
 
// Mapped question bank crud area



// Exam crud area
  Route::get('admin/getExam', ['as'=>'api.getExam','uses'=>'ApiAdminController@getExam']);
  
  Route::post('admin/createExam', ['as'=>'api.createExam','uses'=>'ApiAdminController@createExam']);
  
  Route::put('admin/updateExam', ['as'=>'api.updateExam','uses'=>'ApiAdminController@updateExam']);
  Route::delete('admin/deleteExam/{id}', ['as'=>'api.deleteExam','uses'=>'ApiAdminController@deleteExam'])->where(['id' => '[0-9]+']);

  Route::put('admin/changeExamStatus', ['as'=>'api.changeExamStatus','uses'=>'ApiAdminController@changeExamStatus']);

 // Exam crud area
  

// Mapped exam bank crud area
  Route::get('admin/getMappedExamBank/{id}', ['as'=>'api.getMappedExamBank','uses'=>'ApiAdminController@getMappedExamBank'])->where(['id' => '[0-9]+']);
// Mapped exam bank crud area


// Mapped exam start crud area
  Route::post('admin/putCacheData', ['as'=>'api.putCacheData','uses'=>'ApiAdminController@putCacheData']);
  Route::get('admin/getCacheData', ['as'=>'api.getCacheData','uses'=>'ApiAdminController@getCacheData']);
  Route::post('admin/forgetCacheData', ['as'=>'api.forgetCacheData','uses'=>'ApiAdminController@forgetCacheData']);
  Route::get('admin/getActiveExam', ['as'=>'api.getActiveExam','uses'=>'ApiAdminController@getActiveExam']);

  Route::post('admin/getExamQuestionData', ['as'=>'api.getExamQuestionData','uses'=>'ApiAdminController@getExamQuestionData']);

  Route::post('admin/postExamQuestionData', ['as'=>'api.postExamQuestionData','uses'=>'ApiAdminController@postExamQuestionData']);
  
  Route::post('admin/makeExamQuestionAnSheet', ['as'=>'api.makeExamQuestionAnSheet','uses'=>'ApiAdminController@makeExamQuestionAnSheet']);

  Route::post('admin/getExamAnsSheet', ['as'=>'api.getExamAnsSheet','uses'=>'ApiAdminController@getExamAnsSheet']);

  Route::delete('admin/userExdata/{id}', ['as'=>'api.userExdata','uses'=>'ApiAdminController@userExdata'])->where(['id' => '[0-9]+']);

// Mapped exam start crud area


// Examresult crud area
  Route::get('admin/getExamresult', ['as'=>'api.getExamresult','uses'=>'ApiAdminController@getExamresult']);
// Examresult crud area





});

Route::group([
  'middleware' => ['auth:api','RoleAuth:User','CORS'],
  //'prefix' => 'auth',
  'namespace' => 'Api'
], function () {

  Route::get('user/getBalanceForUser', ['as'=>'api.getBalanceForUser','uses'=>'ApiUserController@getBalanceForUser']);

  Route::get('user/getSelfProfile', ['as'=>'api.getSelfProfile','uses'=>'ApiUserController@getSelfProfile']);
  
  Route::put('user/putSelfProfile', ['as'=>'api.putSelfProfile','uses'=>'ApiUserController@putSelfProfile']);
  
  Route::post('user/putSelfPassword', ['as'=>'api.putSelfPassword','uses'=>'ApiUserController@putSelfPassword']);
  
  Route::post('user/putSelfPasswordConfirmation', ['as'=>'api.putSelfPasswordConfirmation','uses'=>'ApiUserController@putSelfPasswordConfirmation']);


  Route::post('user/dateWiseUserFundTrnHistory', ['as'=>'api.dateWiseUserFundTrnHistory','uses'=>'ApiUserController@dateWiseUserFundTrnHistory']);

  Route::get('user/getDashboardData', ['as'=>'api.getDashboardData','uses'=>'ApiUserController@getDashboardData']);



  // Mapped exam start crud area
  Route::post('user/putCacheData', ['as'=>'api.putCacheData','uses'=>'ApiUserController@putCacheData']);
  Route::get('user/getCacheData', ['as'=>'api.getCacheData','uses'=>'ApiUserController@getCacheData']);
  Route::post('user/forgetCacheData', ['as'=>'api.forgetCacheData','uses'=>'ApiUserController@forgetCacheData']);
  Route::get('user/getActiveExam', ['as'=>'api.getActiveExam','uses'=>'ApiUserController@getActiveExam']);

  Route::post('user/getExamQuestionData', ['as'=>'api.getExamQuestionData','uses'=>'ApiUserController@getExamQuestionData']);

  Route::post('user/postExamQuestionData', ['as'=>'api.postExamQuestionData','uses'=>'ApiUserController@postExamQuestionData']);
  
  Route::post('user/makeExamQuestionAnSheet', ['as'=>'api.makeExamQuestionAnSheet','uses'=>'ApiUserController@makeExamQuestionAnSheet']);

  Route::post('user/getExamAnsSheet', ['as'=>'api.getExamAnsSheet','uses'=>'ApiUserController@getExamAnsSheet']);

  Route::delete('user/userExdata/{id}', ['as'=>'api.userExdata','uses'=>'ApiUserController@userExdata'])->where(['id' => '[0-9]+']);

// Mapped exam start crud area


// Examresult crud area
  Route::get('user/getExamresult', ['as'=>'api.getExamresult','uses'=>'ApiUserController@getExamresult']);
// Examresult crud area


});


// Auth Route

Route::group([
  'middleware' => ['auth:api','CORS'],
  'namespace' => 'Api'
], function () {

//common
  Route::get('getRank', ['as'=>'api.getRank','uses'=>'ApiAuthController@getRank']);
  Route::post('logout',['as'=>'api.logout','uses'=>'ApiAuthController@logout']);
  //Route::post('refresh',['as'=>'api.refresh','uses'=>'ApiAuthController@refresh']);
  //Route::post('me',['as'=>'api.me','uses'=>'ApiAuthController@me']);
  //Route::post('payload',['as'=>'api.payload','uses'=>'ApiAuthController@payload']);
//common


});


Route::group([
  'middleware' => ['CORS'],
  'namespace' => 'Api'
], function () {
  Route::get('test1',['as'=>'api.test1','uses'=>'ApiGuestController@test1']);
  Route::get('test',['as'=>'api.test','uses'=>'ApiAuthController@test']);
  Route::post('login',['as'=>'api.login','uses'=>'ApiAuthController@login']);
  Route::post('postResetInfo',['as'=>'api.postResetInfo','uses'=>'ApiAuthController@postResetInfo']);
  Route::post('verifycodeCheck',['as'=>'api.verifycodeCheck','uses'=>'ApiAuthController@verifycodeCheck']);
  Route::post('putResetPasswordConfirmation',['as'=>'api.putResetPasswordConfirmation','uses'=>'ApiAuthController@putResetPasswordConfirmation']);


});



Route::group([
  'middleware' => ['auth:api','RoleAuth:Superadmin','CORS'],
  //'prefix' => 'auth',
  'namespace' => 'Api'
], function () {

  
  Route::get('superadmin/getBalanceForSuperadmin', ['as'=>'api.getBalanceForSuperadmin','uses'=>'ApiSuperAdminController@getBalanceForSuperadmin']);

  Route::get('superadmin/getSelfProfile', ['as'=>'api.getSelfProfile','uses'=>'ApiSuperAdminController@getSelfProfile']);

  Route::post('superadmin/putSelfProfile', ['as'=>'api.putSelfProfile','uses'=>'ApiSuperAdminController@putSelfProfile']);
  
  Route::post('superadmin/putSelfPassword', ['as'=>'api.putSelfPassword','uses'=>'ApiSuperAdminController@putSelfPassword']);
  
  Route::post('superadmin/putSelfPasswordConfirmation', ['as'=>'api.putSelfPasswordConfirmation','uses'=>'ApiSuperAdminController@putSelfPasswordConfirmation']);

});
