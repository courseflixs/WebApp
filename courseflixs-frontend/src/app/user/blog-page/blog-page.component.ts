import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../admin/services/blog.service';
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../admin/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

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

  constructor(
    private blogService:BlogService,
    private catService:CategoryService,
    private router:Router,
    private _commonService:CommonService,
    private route:ActivatedRoute){}

  ngOnInit(): void {
    window.scroll(0,0)
    this._commonService.showLoader()
    this.catService.getTypeWiseCatService('Blog').subscribe((result)=>{
      this._commonService.hideLoader()
      this.getBlogCat=result;
    })

    this._commonService.showLoader()
   this.blogService.getTopBlog().subscribe((result)=>{
    this._commonService.hideLoader()
    this.getTopBlog=result;
    })
    this.catParams=this.route.snapshot.paramMap.get('category');
    if(this.catParams){
      this._commonService.showLoader()
      this.blogService.getAllPublicAndCategoryBlog(this.catParams).subscribe((result)=>{
        this._commonService.hideLoader()
        this.getAllBlogs=result
        console.log(this.getAllBlogs)
      });
    }else{
      this._commonService.showLoader()
      this.blogService.getAllPublicAndCategoryBlog('Public').subscribe((result)=>{
        this._commonService.hideLoader()
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
