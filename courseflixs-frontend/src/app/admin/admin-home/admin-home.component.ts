import { Component,OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  

  constructor(private router: Router) {}
  sideBarOpen = false;
 
  
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sideBarOpen = false;
      }
    });

  }
  

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;

  }
}
