import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {

  ngOnInit():void {
    window.scroll(0,0)
  }

  
}
