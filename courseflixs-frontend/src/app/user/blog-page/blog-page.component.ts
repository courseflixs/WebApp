import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../admin/services/blog.service';
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../admin/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit{
  getAllBlogs:any;
  getBlogCat:any;
  catParams:String |null | undefined;
  getTopBlog:any;
  p: number = 1;

  constructor(private blogService:BlogService,private catService:CategoryService,private router:Router,private route:ActivatedRoute){

  }

  ngOnInit(): void {

    this.catService.getTypeWiseCatService('Blog').subscribe((result)=>{
      this.getBlogCat=result;
    })
   this.blogService.getTopBlog().subscribe((result)=>{
    this.getTopBlog=result;
    })
    this.catParams=this.route.snapshot.paramMap.get('category');
    if(this.catParams){
      this.blogService.getAllPublicAndCategoryBlog(this.catParams).subscribe((result)=>{
        this.getAllBlogs=result
        console.log(this.getAllBlogs)
      });
    }else{
      this.blogService.getAllPublicAndCategoryBlog('Public').subscribe((result)=>{
        this.getAllBlogs=result
        console.log(this.getAllBlogs)
      });
    }
  }

  getImageUrl(filename: String) {
    return `${environment.apiUrl}/image/blog/${filename}`;
  }
  
  redirectToSamePageURL(cat:String){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/blogs', cat]) // Navigate to the same URL
    })
  }
}
