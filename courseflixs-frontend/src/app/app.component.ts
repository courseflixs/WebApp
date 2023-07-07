import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'courseflixs';
  changeHeader='user'
  constructor(private router:Router){

  }
  ngOnInit():void{
    this.router.events.subscribe((val:any)=>{
      if(val.url){
        if(val.url.toString().includes('admin')){
          this.changeHeader='admin'
        }
      }
    })
  }
  
}
