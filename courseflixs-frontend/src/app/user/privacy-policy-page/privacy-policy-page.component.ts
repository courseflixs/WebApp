import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-page',
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.css']
})
export class PrivacyPolicyPageComponent implements OnInit {
ngOnInit(): void {
  window.scrollTo(0, 0)

}
}
