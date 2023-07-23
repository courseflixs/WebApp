import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-newcourse-section',
  templateUrl: './newcourse-section.component.html',
  styleUrls: ['./newcourse-section.component.css']
})
export class NewcourseSectionComponent implements OnInit{
  newPro:any;
  constructor(private endUserProService:ProductService){}
  ngOnInit(): void {
    this.endUserProService.getAllNewProServices().subscribe((result)=>{
      this.newPro=result.slice(0,8)
    })
  }
  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
}
