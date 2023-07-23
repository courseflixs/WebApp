import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }
  sendEmailOnForgotService(data: any) {
    return this.http.post(`${environment.apiUrl}/user/forgot-password`, data)
  }

  setNewPasswordService(data:any){
    return this.http.post(`${environment.apiUrl}/user/reset-password`, data)

  }
}
