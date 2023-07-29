import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogService } from '../../admin/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../admin/services/category.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-details-page',
  templateUrl: './blog-details-page.component.html',
  styleUrls: ['./blog-details-page.component.css']
})
export class BlogDetailsPageComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: false,


  };
  blogID: String | null | undefined;
  getSingleBlogDetails: any;
  getBlogCat: any;
  getTopBlog: any;
  constructor(private blogService: BlogService, private route: ActivatedRoute, private catService: CategoryService,private router:Router) { }
  ngOnInit(): void {
    this.blogID = this.route.snapshot.paramMap.get('blogID');
    this.blogService.getSingleBlogServices(this.blogID).subscribe((result) => {
      this.getSingleBlogDetails = result;
    })

    this.catService.getTypeWiseCatService('Blog').subscribe((result) => {
      this.getBlogCat = result;
    })

    this.blogService.getTopBlog().subscribe((result) => {
      this.getTopBlog = result;
    })
  }

  getImageUrl(filename: String) {
    return `${environment.apiUrl}/image/blog/${filename}`;
  }
  
  redirectToSamePageURL(blogID:String){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/blog-details',blogID]) // Navigate to the same URL
    })
  }
}
