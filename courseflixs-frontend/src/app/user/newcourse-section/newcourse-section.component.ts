import { Component } from '@angular/core';

@Component({
  selector: 'app-newcourse-section',
  templateUrl: './newcourse-section.component.html',
  styleUrls: ['./newcourse-section.component.css']
})
export class NewcourseSectionComponent {
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
