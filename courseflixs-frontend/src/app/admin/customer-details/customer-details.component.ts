import { Component,OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit{
  dtOptions: any = {};
  getAllEnduserData:any;
  constructor(private userService:UserAuthService,private _commonService: CommonService){}

  ngOnInit(): void {
    // angular data-table  responsive  settings
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
    ]
    };
        // {{END}}
        this._commonService.showLoader()
        this.userService.getAllEnduserService().subscribe((result)=>{
          this._commonService.hideLoader()
          this.getAllEnduserData=result
        })

  }


  }

