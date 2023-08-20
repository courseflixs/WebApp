import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }
  sendEmailService(data:any){
    return this.http.post(`${environment.apiUrl}/user/send-contact-email`, data)

  }
}
