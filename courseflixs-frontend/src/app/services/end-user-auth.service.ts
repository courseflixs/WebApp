import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EndUserAuthService {
  isEndUserAuthError = new EventEmitter<boolean>(false);
  userData: any;
  constructor(private http: HttpClient) { }

  registerUserServices(data: any) {
    return this.http.post(`${environment.apiUrl}/user/add-user`, data)
  }

  loginUserServices(data: any) {
    this.http.post(`${environment.apiUrl}/user/get-user`, data).subscribe((result: any) => {
      if (result.hasOwnProperty("userMsg"))
        this.isEndUserAuthError.emit(true)
      else {
        this.userData = result;
        console.log(result)
        sessionStorage.setItem("userLoggedIn", result[0].email);
        sessionStorage.setItem("userID", result[0]._id)

        this.isEndUserAuthError.emit(false)
      }

    })

  }
  addSubscriberService(data:any){
    return this.http.post(`${environment.apiUrl}/subscribed/add-subuser`, data)

  }
}
