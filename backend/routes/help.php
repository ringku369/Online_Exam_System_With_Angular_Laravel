<?php  

//sabbirul_softbd
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


