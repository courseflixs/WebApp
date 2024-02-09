import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../admin/services/category.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit{
  getAllPro:any;
  whichPro:any;
  totalPro:Number | undefined;
  catID:any;
  catQoute:any;
  p: number = 1;
  constructor(private endUserProService:ProductService,private router:Router,private catService:CategoryService,private route:ActivatedRoute,private _commonService:CommonService){}
  ngOnInit(): void {
   this.catID= this.route.snapshot.paramMap.get('whichPro');
   this._commonService.showLoader()
    this.catService.getSingleCatService(this.catID).subscribe((res:any)=>{
      this._commonService.hideLoader()
      this.whichPro= res.category_name;
      this.catQoute=res.qoute;
      document.getElementsByClassName("container")[0].scrollTo(0,0);

    })
   if(this.catID=="New"){
    this._commonService.showLoader()
    this.endUserProService.getAllNewProServices().subscribe((result)=>{
      this._commonService.hideLoader()
      this.whichPro=this.catID
      this.getAllPro=result;
      this.totalPro=result.length;
    })
   }else if(this.catID=="All"){
    this._commonService.showLoader()
    this.endUserProService.getAllProService().subscribe((result)=>{
      this._commonService.hideLoader()
      this.whichPro=this.catID
      this.getAllPro=result;
      this.totalPro=result.length;

    })
   }else{
    this._commonService.showLoader()
    this.catService.getSingleCatService(this.catID).subscribe(async(res:any)=>{
      this.whichPro=await res.category_name;
    this.endUserProService.getCategoryWiseProService(this.whichPro).subscribe((result)=>{
      this.getAllPro=result;
      this._commonService.hideLoader()
      this.totalPro=result.length;

    })
  })
  }
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  }

  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }

}
