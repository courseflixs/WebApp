import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  getAllDashboardDetailsData:any;
  constructor(private router:Router,private dashService:DashboardService) { }

  ngOnInit(): void {
    this.dashService.getAllDashboardDetailsService().subscribe((result)=>{
      this.getAllDashboardDetailsData=result;
      console.log(result);
    })
  }
}
