import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseRequestService } from '../../services/course-request.service';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent {
  reqCourseSuccMsg: String | undefined;

  constructor(private requestCourseService: CourseRequestService) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  requestCourseForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    authorNameOfCourse: new FormControl(''),
    linkPageCourse: new FormControl('')
  });

  addRequestCourse() {
    this.requestCourseService.addRequestCourseService(this.requestCourseForm.value).subscribe((result:any) => {
        console.log(result)
        if(result){
          this.reqCourseSuccMsg=result.reqMsg;
          this.requestCourseForm.reset();
          setTimeout(()=>{
            this.reqCourseSuccMsg=undefined;
          },8000);
        }
    })
  }

}
