import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseRequestService } from '../../services/course-request.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent implements OnInit {
  reqCourseSuccMsg: String | undefined;
  commentSuccMsg: String | undefined;
  getAllComment: any
  getAllRequest:any;

  constructor(private requestCourseService: CourseRequestService,private router:Router,private _commonService:CommonService) { }

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
    window.scroll(0,0)
    this._commonService.showLoader()
    this.requestCourseService.getAllCommentService().subscribe((res) => {
      this._commonService.hideLoader()
      this.getAllComment = res
    })
    this._commonService.showLoader()
    this.requestCourseService.getAllRequestCourseService().subscribe((res)=>{
      this._commonService.hideLoader()
      this.getAllRequest=res;
    })
  }

  addRequestCourse() {
    this._commonService.showLoader()
    this.requestCourseService.addRequestCourseService(this.requestCourseForm.value).subscribe((result: any) => {
      console.log(result)
      if (result) {
        this._commonService.hideLoader()
        this.reqCourseSuccMsg = result.reqMsg;
        this.requestCourseForm.reset();
        setTimeout(() => {
          this.reqCourseSuccMsg = undefined;
        }, 8000);
      }else{
        this._commonService.hideLoader()
      }
    })
  }

  addComment() {
    this._commonService.showLoader()
    this.requestCourseService.addCommentService(this.commentForm.value).subscribe((res: any) => {
      if (res.status == 'succ') {
        this._commonService.hideLoader()
        this.commentSuccMsg = res.message;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/request']) // Navigate to the same URL
        })       
        setTimeout(() => {
          this.commentSuccMsg = undefined;
        }, 4000)
      }else{
        this._commonService.hideLoader()
      }
    })
  }

}
