import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndUserAuthService } from '../../services/end-user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  checked = false;
  isUserAuthRegSucMsg: String | undefined;
  isUserAuthRegError: String | undefined;
  isUserAuthLoginError: String | undefined;

  constructor(private endUserService: EndUserAuthService,private router:Router) { }
  ngOnInit(): void {
    document.getElementsByClassName("container")[0].scrollTo(0,0);
  }
  registerForm = new FormGroup({
    userName: new FormControl(''),
    regUserEmail: new FormControl('', [Validators.email]),
    regUserPass: new FormControl('', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$")])
  })
  registerUser() {
    this.endUserService.registerUserServices(this.registerForm?.value).subscribe((result: any) => {
      if (result.isAlreadyExist) {
        this.isUserAuthRegError = result.userMsg;
        this.registerForm.reset()
        setTimeout(() => {
          this.isUserAuthRegError = undefined
        }, 8000)
      } else {
        this.isUserAuthRegSucMsg = result.userMsg;
        this.registerForm.reset()
        setTimeout(() => {
          this.isUserAuthRegSucMsg = undefined
        }, 8000)
      }

    })
  }

  loginForm = new FormGroup({
    loginUserEmail: new FormControl('', [Validators.email]),
    loginUserPass: new FormControl('', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$")])
  })

  loginUser() {
    this.endUserService.loginUserServices(this.loginForm.value)
    this.endUserService.isEndUserAuthError.subscribe((isUseLoginError)=>{
      if(isUseLoginError){
        this.isUserAuthLoginError="Invalid Username/Password!!!"
        setTimeout(()=>{
          this.isUserAuthLoginError=undefined;
        },8000);
      }else{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/user']) // Navigate to the same URL
        })
      }

    })
  }

}
