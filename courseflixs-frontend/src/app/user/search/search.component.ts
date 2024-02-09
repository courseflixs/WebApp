import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  getAllPro:any;
  searchText:String |null | undefined;
  totalPro:number=0;
  filterData:any
  
  p: number = 1;
  constructor(private endUserProService:ProductService,private router:Router,private route:ActivatedRoute,private _commonService:CommonService){}
  ngOnInit(): void {
    this._commonService.showLoader()
    this.endUserProService.getAllProService().subscribe((result)=>{
      this._commonService.hideLoader()
      this.getAllPro=result;

    })
  }
  ngAfterContentChecked()	{
    this.searchText= this.route.snapshot.paramMap.get('searchBy');
    this.filterData= this.getAllPro.filter((pro:any)=>{
      return pro.product_name.toLowerCase().includes(this.searchText?.toLowerCase())
    })
    this.totalPro=this.filterData.length
  }
  getProImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
}
