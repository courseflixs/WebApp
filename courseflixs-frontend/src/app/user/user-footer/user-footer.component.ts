import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EndUserAuthService } from '../../services/end-user-auth.service';
import { NavigationEnd, Router } from '@angular/router';

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
constructor(private endUserService:EndUserAuthService,private router:Router){}

ngOnInit(): void {
     // Login user info
     this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loggedInUserID=sessionStorage.getItem('userID')
      }
    });
}



  addSubscriber() {
   this.endUserService.addSubscriberService(this.subscribedForm.value).subscribe((result:any)=>{
    if(result){
      this.subscribeSuccMsg=result.userMsg;
      this.subscribedForm.reset()
      setTimeout(()=>{
        this.subscribeSuccMsg=undefined;
      },6000)
    }
   })
  }
  // navigateToPage(link:any){
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(link) // Navigate to the same URL
  //   })
  // }
}
