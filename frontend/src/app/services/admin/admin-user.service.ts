import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }

  getDashboardData(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getDashboardData`);
  }

  getSelfProfile(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getSelfProfile`);
  }

  putSelfProfile(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/putSelfProfile`,request);
  }

  putSelfEmail(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/putSelfEmail`,request);
  }

  putSelfPassword(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/putSelfPassword`,request);
  }

  putSelfPasswordConfirmation(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/putSelfPasswordConfirmation`,request);
  }

  getBankForDD(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getBankForDD`);
  }

  getUserForDD(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getUserForDD`);
  }

  getUserProfile(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/getUserProfile`,request);
  }


  // User crud area
  createUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createUser`,request);
  }

  getUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getUser`);
  }

  updateUser(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateUser`,request);
  }

  deleteUser(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteUser/${id}`);
  }
  // User crud area

  // Teacher crud area
  createTeacher(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createTeacher`,request);
  }

  getTeacher(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getTeacher`);
  }

  updateTeacher(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateTeacher`,request);
  }

  deleteTeacher(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteTeacher/${id}`);
  }
  // Teacher crud area


  // Question crud area

  getTeacherForDD(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getTeacherForDD`);
  }

  createQuestion(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createQuestion`,request);
  }

  getQuestion(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getQuestion`);
  }

  updateQuestion(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateQuestion`,request);
  }

  deleteQuestion(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteQuestion/${id}`);
  }
  // Question crud area

  
  // Option crud area
  getQuestionForDD(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getQuestionForDD`);
  }

  createOption(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createOption`,request);
  }

  getOption(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getOption`);
  }

  updateOption(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateOption`,request);
  }

  deleteOption(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteOption/${id}`);
  }
  // Option crud area

  // Answer crud area
  
  getOptionForDD(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getOptionForDD`);
  }
  getOptionForDDWithID(id:any): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getOptionForDDWithID/${id}`);
  }
  createAnswer(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createAnswer`,request);
  }

  getAnswer(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getAnswer`);
  }

  updateAnswer(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateAnswer`,request);
  }

  deleteAnswer(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteAnswer/${id}`);
  }
  // Answer crud area

  // Bank crud area
  createBank(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createBank`,request);
  }

  getBank(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getBank`);
  }

  updateBank(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateBank`,request);
  }

  deleteBank(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteBank/${id}`);
  }
  // Bank crud area


  
  // Question bank crud area
    getQuestionForUIL(): any{
      return this.http.get(`${this.baseurl.geturl()}/admin/getQuestionForUIL`);
    }

    getQBankMapping(): any{
      return this.http.get(`${this.baseurl.geturl()}/admin/getQBankMapping`);
    }

    creatQBankMapping(request:any): any{
      return this.http.post(`${this.baseurl.geturl()}/admin/creatQBankMapping`,request);
    }

    deleteQBankMapping(id:any): any{
      return this.http.delete(`${this.baseurl.geturl()}/admin/deleteQBankMapping/${id}`);
    }


  // Question bank crud area
  
  // Mapped question bank crud area
    getMappedQBank(): any{
      return this.http.get(`${this.baseurl.geturl()}/admin/getMappedQBank`);
    }
    deleteMappedQBank(id:any): any{
      return this.http.delete(`${this.baseurl.geturl()}/admin/deleteMappedQBank/${id}`);
    }
  // Mapped question bank crud area


  // Exam crud area
  createExam(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createExam`,request);
  }
  getExam(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getExam`);
  }
  updateExam(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/updateExam`,request);
  }
  deleteExam(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/deleteExam/${id}`);
  }
  
  changeExamStatus(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/admin/changeExamStatus`,request);
  }
// Exam crud area


// Mapped exam bank crud area
  getMappedExamBank(id:any): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getMappedExamBank/${id}`);
  }
// Mapped exam bank crud area
  

// Mapped exam start crud area
  putCacheData(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/putCacheData`,request);
  }
  
  getCacheData(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getCacheData`);
  }

  forgetCacheData(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/forgetCacheData`,request);
  }
  getActiveExam(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getActiveExam`);
  }
  getExamQuestionData(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/getExamQuestionData`,request);
  }
  postExamQuestionData(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postExamQuestionData`,request);
  }
  makeExamQuestionAnSheet(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/makeExamQuestionAnSheet`,request);
  }
  getExamAnsSheet(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/getExamAnsSheet`,request);
  }
  userExdata(id:any): any{
    return this.http.delete(`${this.baseurl.geturl()}/admin/userExdata/${id}`);
  }


// Mapped exam start crud area
  getExamresult(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getExamresult`);
  }
// Examresult crud area



}
