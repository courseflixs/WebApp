import { Injectable,EventEmitter,OnInit } from '@angular/core';
import { adminLogin } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements OnInit{
  isAdminLoginError= new EventEmitter<boolean>(false)
  constructor(private router:Router,private  http:HttpClient) { }
  ngOnInit(): void {
    
  }
  adminUserLogin(data:adminLogin){
    console.log(data)
    if(data && data.email=="admin@courseflix.io" && data.password=="ZxcvbQwerty@0011"){
      this.isAdminLoginError.emit(false)
      sessionStorage.setItem('adminLogin',JSON.stringify(data.email))
      this.router.navigate(['/admin/home/dashboard'])
    }else{
      console.warn("login failed");
      this.isAdminLoginError.emit(true)
    }
  }

  reloadAdminPanel(){
    if(sessionStorage.getItem('adminLogin')){
      this.router.navigate(['/admin/home/dashboard'])
    }
  }
  getAllEnduserService(){
    return this.http.get<any>(`${environment.apiUrl}/user/get-all-user`)
  }
  getAllSubscribedUserService(){
    return this.http.get<any>(`${environment.apiUrl}/subscribed/get-subuser`)

  }
}
