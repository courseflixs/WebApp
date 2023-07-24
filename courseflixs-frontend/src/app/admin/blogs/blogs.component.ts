import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { BehaviorSubject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { environment } from '../../../environments/environment';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  // Data table reload Setting
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router, private blogService: BlogService, private dialog: MatDialog) { }

  isBlogCrudMsg: String | undefined;
  changeBlogContenArea = 'blogs'
  getAllBlogData: any;
  dtOptions: any = {};

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
      ]
    };
    //To change  content area of product
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (val.url.toString().includes('add-blog')) {
          this.changeBlogContenArea = 'add-blog'
        }
      }
    })
    if (sessionStorage.getItem("isBlogCrudMsg")) {
      this.isBlogCrudMsg = sessionStorage.getItem("isBlogCrudMsg")?.toString();
    }

    setTimeout(() => {
      this.isBlogCrudMsg = undefined;
      sessionStorage.removeItem("isBlogCrudMsg")
    }, 2000)
    setTimeout(() => {
      this.loadUpdatedBlog()

    }, 180)
    window.scrollTo(0, 0)

  }


  reloadDataTable(): void {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }
  }

  resetFields() {
    this.blogService.sharedSingleBlogData = null;
  }
  getImageUrl(filename: string): string {
    console.log(filename.split('.')[1])
    return `${environment.apiUrl}/image/blog/${filename}`;
  }

  loadUpdatedBlog() {
    this.blogService.getAllBlogsService().subscribe((result) => {
      this.getAllBlogData = result;
      this.reloadDataTable();
    })
  }
  commonInAddUpdateDelete(msg: String) {
    this.isBlogCrudMsg = msg
    this.loadUpdatedBlog()
    window.scrollTo(0, 0)

    setTimeout(() => {
      this.isBlogCrudMsg = undefined;

    }, 4000)

  }

  deleteBlog(id: String) {
    this.blogService.deleteBlogService(id).subscribe((result) => {
      this.commonInAddUpdateDelete("Blog deleted Successfully")
    })
  }

  openConfirmationDialog(id: String): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '30rem',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the blog?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteBlog(id);
      } else {
        console.log("No opration")
      }
    });
  }

  getSingleBlog(id: String) {
    this.blogService.getSingleBlogServices(id).subscribe((result) => {
           this.blogService.sharedSingleBlogData=result;
           this.router.navigate(['/admin/home/blogs/add-blog'])
 
    })
  }
}
