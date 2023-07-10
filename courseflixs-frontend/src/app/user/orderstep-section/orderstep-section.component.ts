import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-orderstep-section',
  templateUrl: './orderstep-section.component.html',
  styleUrls: ['./orderstep-section.component.css']
})
export class OrderstepSectionComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}
