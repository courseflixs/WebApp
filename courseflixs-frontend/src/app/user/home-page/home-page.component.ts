import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {
  getAllShowSliderPro: any;
  constructor(private endUserProService: ProductService,private _commonService:CommonService) { }
  ngOnInit(): void {
    this._commonService.showLoader()
    this.endUserProService.getAllShowSliderProServices().subscribe((result) => {
      this._commonService.hideLoader()
      this.getAllShowSliderPro = result;
    });
  }
 

  getSliderImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
}
