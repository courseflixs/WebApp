import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourseRequestService {

  constructor(private http: HttpClient) { }

  addRequestCourseService(data: any) {
    return this.http.post(`${environment.apiUrl}/end-user/request/add-request-course`, data)
  }
  getAllRequestCourseService() {
    return this.http.get(`${environment.apiUrl}/end-user/request/get-request-course`)
  }
  changeReqStatusService(reqID: String) {
    return this.http.put(`${environment.apiUrl}/end-user/request/update-req-course/${reqID}`, {})

  }
  deleteReqCourseService(reqID:String){
    return this.http.delete(`${environment.apiUrl}/end-user/request/delete-request/${reqID}`, {})

  }
  addCommentService(data:any){
    return this.http.post(`${environment.apiUrl}/end-user/request/add-comment`, data)

  }
  getAllCommentService(){
    return this.http.get(`${environment.apiUrl}/end-user/request/get-comment`)

  }
  deleteCommentService(id:String){
    return this.http.delete(`${environment.apiUrl}/end-user/request/delete-comment/${id}`, {})

  }
}
