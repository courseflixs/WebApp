import { Component, OnInit } from '@angular/core';
import { CourseRequestService } from '../../services/course-request.service';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-course-request',
  templateUrl: './course-request.component.html',
  styleUrls: ['./course-request.component.css']
})
export class CourseRequestComponent implements OnInit {
  dtOptions: any = {};
  getAllCourseReqData: any;
  reqCourseSuccMsg: String | undefined;
  constructor(private courseReqService: CourseRequestService, private router: Router, private dialog: MatDialog,private _commonService:CommonService) { }

  ngOnInit(): void {
    // angular data-table  responsive  settings
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
      ]
    };
    this._commonService.showLoader()
    this.courseReqService.getAllRequestCourseService().subscribe((result) => {
      this._commonService.hideLoader()
      this.getAllCourseReqData = result;
    })

  }
  changeReqStatus(reqID: String) {
    this._commonService.showLoader()
    this.courseReqService.changeReqStatusService(reqID).subscribe((result: any) => {
      if (result) {
        this._commonService.hideLoader()
        this.reqCourseSuccMsg = result.reqMsg;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/home/request-course']) // Navigate to the same URL
        })
        setTimeout(() => {
          this.reqCourseSuccMsg = undefined;
        }, 8000)
      }else{
        this._commonService.hideLoader()
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
    this._commonService.showLoader()
    this.courseReqService.deleteReqCourseService(id).subscribe((result:any) => {
      if (result) {
        this._commonService.hideLoader()
        this.reqCourseSuccMsg = result.reqMsg;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/home/request-course']) // Navigate to the same URL
        })
        setTimeout(() => {
          this.reqCourseSuccMsg = undefined;
        }, 8000)
      }else{
        this._commonService.hideLoader()
      }
    })
  }
}
