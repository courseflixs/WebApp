import { Component, OnInit } from '@angular/core';
import { CourseRequestService } from '../../services/course-request.service';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-course-request',
  templateUrl: './course-request.component.html',
  styleUrls: ['./course-request.component.css']
})
export class CourseRequestComponent implements OnInit {
  dtOptions: any = {};
  getAllCourseReqData: any;
  reqCourseSuccMsg: String | undefined;
  constructor(private courseReqService: CourseRequestService, private router: Router, private dialog: MatDialog) { }

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


  openConfirmationDialog(id: String): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '30rem',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the Request?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteRequest(id);
      } else {
        console.log("No opration")
      }
    });
  }
  deleteRequest(id: String) {
    this.courseReqService.deleteReqCourseService(id).subscribe((result:any) => {
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
