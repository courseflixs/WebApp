import { Component,inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips'
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ProductService } from '../services/product.service';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrls: ['./add-blogs.component.css'],
})
export class AddBlogsComponent {


// Angular editor config
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  // add multip tag in a particular product

  keywords:string[]=[];
  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`removed ${keyword}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  //############################################################################################//
  //<|========================= Integration with backend from here ======================|>
  //############################################################################################//
  progress: number = 0;
  getAllCatCombobox: any;
  isBlogCrudMsg: String | undefined;
  getSingleBlog: any
  viewImgDialogue: String = ''
  viewDialogueTitle: String = ''

  constructor(private catService: CategoryService, private blogService:BlogService , private router: Router) { }

  ngOnInit(): void {
    // Fetching all the  category for displaying in category combobox
    this.catService.getTypeWiseCatService("Blog").subscribe(async (result) => {
      this.getAllCatCombobox = await result;
    })
    //Accessing sharedData to display default value at the time of update product
    this.getSingleBlog = this.blogService.sharedSingleBlogData;
    this.keywords = this.getSingleBlog?this.getSingleBlog.tags:[];
    window.scrollTo(0, 0)

  }

  blogForm=new FormGroup({
    blogVisiblity:new FormControl(''),
    blogName: new FormControl(''),
    blogCategory: new FormControl(''),
    blogDesc:new FormControl(''),
    blogImage:new FormControl(null),
    updatedBlogImg:new FormControl('')
  });

  onFileChange(event: any) {
      if (event.target.files.length > 0) {
        console.log(event.target.files)
        const file = event.target.files[0];
        this.blogForm.patchValue({
          blogImage: file
        });
      }
    
  }

  getImageUrl(filename: String, dialogueTitle: String) {
    this.viewImgDialogue = `${environment.apiUrl}/image/blog/${filename}`;
    console.log( this.viewImgDialogue)
    this.viewDialogueTitle = dialogueTitle
  }
  
  addBlog(){
    const formData=new FormData();
    formData.append("blogVisiblity",this.blogForm.get('blogVisiblity')?.value || '')
    formData.append("blogName",this.blogForm.get('blogName')?.value || '')
    formData.append("blogCategory",this.blogForm.get('blogCategory')?.value || '')
    formData.append("blogDesc",this.blogForm.get('blogDesc')?.value || '')
    formData.append('blogTags',JSON.stringify(this.keywords))
    formData.append("blogImage",this.blogForm.get('blogImage')?.value || '')
    formData.append("updatedBlogImg",this.blogForm.get('updatedBlogImg')?.value || '')

    this.blogService.addBlogService(formData).subscribe((event: HttpEvent<any>)=>{
      window.scrollTo(0, 0)
      console.log(event);
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round((event.loaded || 1) / (event.total || 1) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body.blogMsg);
          sessionStorage.setItem("isBlogCrudMsg", event.body.blogMsg);

          setTimeout(() => {
            this.progress = 0;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/home/blogs']) // Navigate to the same URL

            })
          }, 1500);
      }
    })

  }
  updateBlog(id:String){
    const formData=new FormData();
    formData.append("blogVisiblity",this.blogForm.get('blogVisiblity')?.value || '')
    formData.append("blogName",this.blogForm.get('blogName')?.value || '')
    formData.append("blogCategory",this.blogForm.get('blogCategory')?.value || '')
    formData.append("blogDesc",this.blogForm.get('blogDesc')?.value || '')
    formData.append('blogTags',JSON.stringify(this.keywords))
    formData.append("blogImage",this.blogForm.get('blogImage')?.value || '')
    formData.append("updatedBlogImg",this.blogForm.get('updatedBlogImg')?.value || '')

    this.blogService.updateProService(id,formData).subscribe((event: HttpEvent<any>)=>{
      console.log(event);
      window.scrollTo(0, 0)

      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round((event.loaded || 1) / (event.total || 1) * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body.blogMsg);
          sessionStorage.setItem("isBlogCrudMsg", event.body.blogMsg)
          setTimeout(() => {
            this.progress = 0;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/home/blogs']) // Navigate to the same URL

            })
            }, 1500);
      }
    })

  }

  //<|========================= Integration with backend from here {END}======================|>

}
