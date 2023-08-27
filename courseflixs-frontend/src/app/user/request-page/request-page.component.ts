import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseRequestService } from '../../services/course-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent implements OnInit {
  reqCourseSuccMsg: String | undefined;
  commentSuccMsg: String | undefined;
  getAllComment: any

  constructor(private requestCourseService: CourseRequestService,private router:Router) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  requestCourseForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    authorNameOfCourse: new FormControl(''),
    linkPageCourse: new FormControl('')
  });
  commentForm = new FormGroup({
    name: new FormControl(''),
    msg: new FormControl('')
  })
  ngOnInit(): void {
    window.scroll(0,0);
    this.requestCourseService.getAllCommentService().subscribe((res) => {
      this.getAllComment = res
    })
  }

  addRequestCourse() {
    this.requestCourseService.addRequestCourseService(this.requestCourseForm.value).subscribe((result: any) => {
      console.log(result)
      if (result) {
        this.reqCourseSuccMsg = result.reqMsg;
        this.requestCourseForm.reset();
        setTimeout(() => {
          this.reqCourseSuccMsg = undefined;
        }, 8000);
      }
    })
  }

  addComment() {
    this.requestCourseService.addCommentService(this.commentForm.value).subscribe((res: any) => {
      if (res.status == 'succ') {
        this.commentSuccMsg = res.message;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/request']) // Navigate to the same URL
        })       
        setTimeout(() => {
          this.commentSuccMsg = undefined;
        }, 4000)
      }
    })
  }

}
