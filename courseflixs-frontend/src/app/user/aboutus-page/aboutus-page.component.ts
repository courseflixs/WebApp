import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus-page.component.html',
  styleUrls: ['./aboutus-page.component.css']
})
export class AboutusPageComponent {
  ngOnInit(){
    document.getElementsByClassName("container")[0].scrollTo(0,0);
  }
  
}
