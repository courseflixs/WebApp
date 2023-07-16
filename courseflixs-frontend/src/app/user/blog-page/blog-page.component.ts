import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent {
  Blogs = [
    // Define your product data here
    { id:"1",imageUrl: '../../../assets/slider1.jpg', blog_post_title: 'Increase your productivity rapidly by followiing some steps',blog_date_cat:'TECHNOLOGY 04/03/2023', blog_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos earum placeat perspiciatis esse illum exercitationem mollitia beatae at, doloribus nisi possimus doloremque officiis similique suscipit amet odit numquam ad minus!' },
    { id:"2",imageUrl: '../../../assets/slider1.jpg', blog_post_title: 'Increase your productivity rapidly by followiing some steps',blog_date_cat:'TECHNOLOGY 04/03/2023', blog_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos earum placeat perspiciatis esse illum exercitationem mollitia beatae at, doloribus nisi possimus doloremque officiis similique suscipit amet odit numquam ad minus!' },
    { id:"3",imageUrl: '../../../assets/slider1.jpg', blog_post_title: 'Increase your productivity rapidly by followiing some steps',blog_date_cat:'TECHNOLOGY 04/03/2023', blog_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos earum placeat perspiciatis esse illum exercitationem mollitia beatae at, doloribus nisi possimus doloremque officiis similique suscipit amet odit numquam ad minus!' },
    { id:"4",imageUrl: '../../../assets/slider1.jpg', blog_post_title: 'Increase your productivity rapidly by followiing some steps',blog_date_cat:'TECHNOLOGY 04/03/2023', blog_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos earum placeat perspiciatis esse illum exercitationem mollitia beatae at, doloribus nisi possimus doloremque officiis similique suscipit amet odit numquam ad minus!' },
    { id:"5",imageUrl: '../../../assets/slider1.jpg', blog_post_title: 'Increase your productivity rapidly by followiing some steps',blog_date_cat:'TECHNOLOGY 04/03/2023', blog_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos earum placeat perspiciatis esse illum exercitationem mollitia beatae at, doloribus nisi possimus doloremque officiis similique suscipit amet odit numquam ad minus!' },
    { id:"6",imageUrl: '../../../assets/slider1.jpg', blog_post_title: 'Increase your productivity rapidly by followiing some steps',blog_date_cat:'TECHNOLOGY 04/03/2023', blog_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos earum placeat perspiciatis esse illum exercitationem mollitia beatae at, doloribus nisi possimus doloremque officiis similique suscipit amet odit numquam ad minus!' },

    // Add more products as needed
  ];
  p: number = 1;

}
