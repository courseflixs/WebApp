import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.css']
})
export class PrivacyPolicyPageComponent {
  ngOnInit(){
    window.scroll(0,0);
  }
}
