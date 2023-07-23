import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orderstep-section',
  templateUrl: './orderstep-section.component.html',
  styleUrls: ['./orderstep-section.component.css']
})
export class OrderstepSectionComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  contactForm=new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
      contact:new FormControl(''),
      msg:new FormControl('')
  })
  sendEmail(){

  }
}
