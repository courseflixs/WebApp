import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-orderstep-section',
  templateUrl: './orderstep-section.component.html',
  styleUrls: ['./orderstep-section.component.css']
})
export class OrderstepSectionComponent {
  constructor(private contactService:ContactService){}
  contactSuccMsg:string | undefined;
  contactErroMsg:string | undefined;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  contactForm=new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
      contact:new FormControl(''),
      msg:new FormControl('')
  })
  sendEmail(){
    this.contactService.sendEmailService(this.contactForm.value).subscribe((res:any)=>{
      if(res.status == 'Succ'){
        this.contactSuccMsg=res.message;
        setTimeout(()=>{
          this.contactSuccMsg=undefined;
        },4000)
      }else{
        this.contactErroMsg=res.message;
        setTimeout(()=>{
          this.contactErroMsg=undefined;
        },4000)
      }
    })
  }
}
