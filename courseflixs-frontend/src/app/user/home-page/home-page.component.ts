import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {
  getAllShowSliderPro: any;
  constructor(private endUserProService: ProductService) { }
  ngOnInit(): void {
    this.endUserProService.getAllShowSliderProServices().subscribe((result) => {
      this.getAllShowSliderPro = result;
      console.log(result);
    });

  }
 

  getSliderImageUrl(imageName: string) {
    return `${environment.apiUrl}/image/product/${imageName}`;
  }
}
