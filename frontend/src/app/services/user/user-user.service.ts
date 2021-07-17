import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserUserService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }

  getDashboardData(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getDashboardData`);
  }
  
  getSelfProfile(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getSelfProfile`);
  }

  putSelfProfile(request:any): any{
    return this.http.put(`${this.baseurl.geturl()}/user/putSelfProfile`,request)
  }

  putSelfPassword(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/putSelfPassword`,request);
  }

  putSelfPasswordConfirmation(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/putSelfPasswordConfirmation`,request);
  }

  
// Mapped exam start crud area
putCacheData(request:any): any{
  return this.http.post(`${this.baseurl.geturl()}/user/putCacheData`,request);
}

getCacheData(): any{
  return this.http.get(`${this.baseurl.geturl()}/user/getCacheData`);
}

forgetCacheData(request:any): any{
  return this.http.post(`${this.baseurl.geturl()}/user/forgetCacheData`,request);
}
getActiveExam(): any{
  return this.http.get(`${this.baseurl.geturl()}/user/getActiveExam`);
}
getExamQuestionData(request:any): any{
  return this.http.post(`${this.baseurl.geturl()}/user/getExamQuestionData`,request);
}
postExamQuestionData(request:any): any{
  return this.http.post(`${this.baseurl.geturl()}/user/postExamQuestionData`,request);
}
makeExamQuestionAnSheet(request:any): any{
  return this.http.post(`${this.baseurl.geturl()}/user/makeExamQuestionAnSheet`,request);
}
getExamAnsSheet(request:any): any{
  return this.http.post(`${this.baseurl.geturl()}/user/getExamAnsSheet`,request);
}
userExdata(id:any): any{
  return this.http.delete(`${this.baseurl.geturl()}/user/userExdata/${id}`);
}


// Mapped exam start crud area
getExamresult(): any{
  return this.http.get(`${this.baseurl.geturl()}/user/getExamresult`);
}
// Examresult crud area



}
