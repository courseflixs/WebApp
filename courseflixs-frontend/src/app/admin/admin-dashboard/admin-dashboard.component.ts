import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  getAllDashboardDetailsData:any;
  constructor(private router:Router,private dashService:DashboardService,private _commonService:CommonService) { }

  ngOnInit(): void {
    this._commonService.showLoader()
    this.dashService.getAllDashboardDetailsService().subscribe((result)=>{
      this._commonService.hideLoader()
      this.getAllDashboardDetailsData=result;
      console.log(result);
    })
  }
}
