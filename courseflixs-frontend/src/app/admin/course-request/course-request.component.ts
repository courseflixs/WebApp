import { Component, OnInit } from '@angular/core';
import { CourseRequestService } from '../../services/course-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-request',
  templateUrl: './course-request.component.html',
  styleUrls: ['./course-request.component.css']
})
export class CourseRequestComponent implements OnInit {
  dtOptions: any = {};
  getAllCourseReqData: any;
  reqCourseSuccMsg: String | undefined;
  constructor(private courseReqService: CourseRequestService, private router: Router) { }

  ngOnInit(): void {
    // angular data-table  responsive  settings
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
      ]
    };
    this.courseReqService.getAllRequestCourseService().subscribe((result) => {
      this.getAllCourseReqData = result;
    })

  }
  changeReqStatus(reqID: String) {
    this.courseReqService.changeReqStatusService(reqID).subscribe((result: any) => {
      window.scrollTo(0, 0)
      if (result) {
        this.reqCourseSuccMsg = result.reqMsg;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/home/request-course']) // Navigate to the same URL
        })
        setTimeout(() => {
          this.reqCourseSuccMsg = undefined;
        }, 8000)
      }
    })
  }
}
