import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus-page.component.html',
  styleUrls: ['./aboutus-page.component.css']
})
export class AboutusPageComponent {
  ngOnInit(){
    window.scroll(0,0);
  }
}
