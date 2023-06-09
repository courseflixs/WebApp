import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

}
