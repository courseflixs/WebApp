import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndUserAuthService } from '../../services/end-user-auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent implements OnInit{
  subscribeSuccMsg:String | undefined;
  loggedInUserID:String |null | undefined;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  subscribedForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
constructor(private endUserService:EndUserAuthService,private router:Router,private _commonService:CommonService){}

ngOnInit(): void {
     // Login user info
     this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedInUserID=sessionStorage.getItem('userID')
      }
    });
}



  addSubscriber() {
    this._commonService.showLoader()
   this.endUserService.addSubscriberService(this.subscribedForm.value).subscribe((result:any)=>{
    if(result){
      this._commonService.hideLoader()
      this.subscribeSuccMsg=result.userMsg;
      this.subscribedForm.reset()
      setTimeout(()=>{
        this.subscribeSuccMsg=undefined;
      },6000)
    }else{
      this._commonService.hideLoader()
    }
   })
  }
  navigateToPage(link:any){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['login']) // Navigate to the same URL
    })
  }
  scrollToTop(){
    document.getElementsByClassName("container")[0].scrollTo(0,0);
     
  }

  navigateToSection(fragment:any){
    this.router.navigate(['/'], {fragment:fragment });
    setTimeout(()=>{
      this.router.navigate(['/'], {fragment:fragment });
   },150)
  
   }
}
