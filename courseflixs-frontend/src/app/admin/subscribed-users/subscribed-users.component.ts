import { Component,OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-subscribed-users',
  templateUrl: './subscribed-users.component.html',
  styleUrls: ['./subscribed-users.component.css']
})
export class SubscribedUsersComponent implements OnInit{
  dtOptions: any = {};
  getAllSubsUserData:any
constructor(private userService:UserAuthService,private _commonService:CommonService){}
  ngOnInit(): void {
    this.dtOptions = {
      responsive: true
    };
    this._commonService.showLoader()
    this.userService.getAllSubscribedUserService().subscribe((result)=>{
      this._commonService.hideLoader()
      this.getAllSubsUserData=result
    })
  }
}
