import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit{
  getAllPro:any;
  whichPro:String |null | undefined;
  totalPro:Number | undefined;
  
  p: number = 1;
  constructor(private endUserProService:ProductService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
   this.whichPro= this.route.snapshot.paramMap.get('whichPro');
   if(this.whichPro=="New"){
    this.endUserProService.getAllNewProServices().subscribe((result)=>{
      this.getAllPro=result;
      this.totalPro=result.length;
    })
   }else if(this.whichPro=="All"){
    this.endUserProService.getAllProService().subscribe((result)=>{
      this.getAllPro=result;
      this.totalPro=result.length;

    })
   }else{
    this.endUserProService.getCategoryWiseProService(this.whichPro).subscribe((result)=>{
      this.getAllPro=result;
      this.totalPro=result.length;

    })
   }
   window.scrollTo(0, 0)

  }

  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }

}
