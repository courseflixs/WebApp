import { Component,OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-subscribed-users',
  templateUrl: './subscribed-users.component.html',
  styleUrls: ['./subscribed-users.component.css']
})
export class SubscribedUsersComponent implements OnInit{
  dtOptions: any = {};
  getAllSubsUserData:any
constructor(private userService:UserAuthService){}
  ngOnInit(): void {
    this.dtOptions = {
      responsive: true
    };
    this.userService.getAllSubscribedUserService().subscribe((result)=>{
      this.getAllSubsUserData=result
    })
  }
}
