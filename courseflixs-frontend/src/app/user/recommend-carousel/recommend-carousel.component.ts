import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-recommend-carousel',
  templateUrl: './recommend-carousel.component.html',
  styleUrls: ['./recommend-carousel.component.css']
})
export class RecommendCarouselComponent {
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

  products = [
    // Define your product data here
    { id:"1",imageUrl: '../../../assets/pro1.png', name: 'Product 1', description: 'Lorem ipsum dolor sit amet' },
    { id:"2",imageUrl: '../../../assets/pro3.png', name: 'Product 2', description: 'Consectetur adipiscing elit' },
    { id:"3",imageUrl: '../../../assets/pro3.png', name: 'Product 3', description: 'Sed do eiusmod tempor incididunt' },
    { id:"4",imageUrl: '../../../assets/pro1.png', name: 'Product 3', description: 'Sed do eiusmod tempor incididunt' },
    { id:"5",imageUrl: '../../../assets/pro3.png', name: 'Product 3', description: 'Sed do eiusmod tempor incididunt' },
    { id:"6",imageUrl: '../../../assets/pro3.png', name: 'Product 3', description: 'Sed do eiusmod tempor incididunt' },

    // Add more products as needed
  ];
}
