import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotSuccMsg: String | null | undefined;
  forgotErrorMsg: String | null | undefined;
  token: String | null | undefined;
  hide = true;

  forgotPassForm = new FormGroup({
    forgotUserEmail: new FormControl('', [Validators.email, Validators.required])
  })
  setNewPassForm = new FormGroup({
    newPassword: new FormControl('', [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$")])
  })
  constructor(
    private forgotPassService: ForgotPasswordService,
     private route: ActivatedRoute, 
     private _commonService:CommonService,
     private router: Router) { }
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }
  sendEmailOnForgot() {
    this._commonService.showLoader()
    this.forgotPassService.sendEmailOnForgotService(this.forgotPassForm.value).subscribe((result: any) => {
      if (result?.status == 'Succ') {
        this._commonService.hideLoader()
        this.forgotSuccMsg = result?.message;
        setTimeout(() => {
          this.forgotSuccMsg = undefined;
          this.forgotPassForm.reset()
        }, 5000)

      } else {
        this._commonService.hideLoader()
        this.forgotErrorMsg = result?.message
        setTimeout(() => {
          this.forgotErrorMsg = undefined;
        }, 5000)
      }
    })
  }

  setNewPassword() {
    this._commonService.showLoader()
    this.forgotPassService.setNewPasswordService({ token: this.token, newPassword: this.setNewPassForm.get('newPassword')?.value }).subscribe((result: any) => {
      if (result.status == 'Succ') {
        this._commonService.hideLoader()
        this.forgotSuccMsg = result.message;
        setTimeout(() => {
          this.forgotSuccMsg = undefined;
          this.router.navigate(['/login'])
        }, 5000)
      } else {
        this._commonService.hideLoader()
        this.forgotErrorMsg = result.message;
        setTimeout(() => {
          this.forgotErrorMsg = result.message;
          this.router.navigate(['/login'])
        }, 5000)
      }
    })
  }

}
