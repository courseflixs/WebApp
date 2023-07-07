import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { adminLogin } from '../data-type';

UserAuthService
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatIconModule, MatButtonModule],
})
export class AdminLoginComponent implements OnInit {
  hide = true;
  adminAuthError:String='';
  constructor(private router: Router, private adminUserService: UserAuthService) {

  }
  ngOnInit(): void {
    this.adminUserService.reloadAdminPanel()
  }
  // ========================================[Admin  login  form data fetching and make  validation on login form field]===================================
  adminLoginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$")])
  })

  get email() {
    return this.adminLoginForm.get('email')
  }

  get password() {
    return this.adminLoginForm.get('password')
  }

  getErrorMessageEmail() {
    if (this.adminLoginForm.controls['email'].hasError('required'))
      return 'You must enter a value';
    return this.adminLoginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.adminLoginForm.controls['password'].hasError('required'))
      return 'You must enter a value';
    return this.adminLoginForm.controls['password'].hasError('pattern') ? 'Password should contains 1 number, 1 lowercase,1 capital letter,1 Special character and minimum length should be 8' : '';
  }
  // ============================================{{END}}====================================================================================================================================
  adminLoginData() {
    this.adminUserService.adminUserLogin(<adminLogin>this.adminLoginForm.value)
    this.adminUserService.isAdminLoginError.subscribe((isAdminLoginError)=>{
      if(isAdminLoginError){
        this.adminAuthError="Invalid username and password!!!"
      }
    })
  }
}
