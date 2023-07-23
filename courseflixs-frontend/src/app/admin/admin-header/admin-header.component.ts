import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  faHome = faHome;
  faBars = faBars;
  
  adminLoggedInUser: String = 'User Name'
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
    sessionStorage.getItem("adminLogin") ? this.adminLoggedInUser = "Admin" : "User Name";

  }
  
  toggleSidebar() {
   
    this.toggleSidebarForMe.emit();
  }
  adminUserLogout() {
    if (sessionStorage.getItem("adminLogin")) {
      sessionStorage.removeItem('adminLogin');
      this.router.navigate(['/admin/login'])
    }
  }
}
