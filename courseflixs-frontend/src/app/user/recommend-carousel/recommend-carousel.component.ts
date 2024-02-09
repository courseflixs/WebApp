import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-recommend-carousel',
  templateUrl: './recommend-carousel.component.html',
  styleUrls: ['./recommend-carousel.component.css']
})
export class RecommendCarouselComponent implements OnInit{
  recomProducts:any;
  constructor(private endUserProService:ProductService,private _commonService:CommonService){}
  ngOnInit(): void {
    this._commonService.showLoader()
    this.endUserProService.getAllRecommendedProServices().subscribe((result)=>{
      this._commonService.hideLoader()
      this.recomProducts=result
      console.log(result)
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    navSpeed: 100,
    margin:10,
    dots:false,
    items:3,
    autoWidth: true,
    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }
  getSliderImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
 
}
