import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus-page',
  templateUrl: './aboutus-page.component.html',
  styleUrls: ['./aboutus-page.component.css']
})
export class AboutusPageComponent implements OnInit{
ngOnInit(): void {
  window.scrollTo(0, 0)

}
}
