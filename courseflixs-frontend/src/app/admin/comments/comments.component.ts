import { Component, ViewChild } from '@angular/core';
import { CourseRequestService } from '../../services/course-request.service';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject } from 'rxjs';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  dtOptions: any = {};
  getAllCommentData:any
  commentSuccMsg:String | undefined
  // Data table reload Setting
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);


constructor(private courseRequestService:CourseRequestService,private dialog: MatDialog){}
  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0 },
        { responsivePriority: 2, targets: -1 }
      ]
    };
    this.getAllComments()
    
  }

  reloadDataTable(): void {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }
  }

  openConfirmationDialog(id: String): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '30rem',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the Comment?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteComment(id);
      } else {
        console.log("No opration")
      }
    });
  }

  deleteComment(id:String){
    this.courseRequestService.deleteCommentService(id).subscribe((res:any)=>{
      if(res.status=="succ"){
        this.getAllComments()
        this.commentSuccMsg=res.message;
        setTimeout(()=>{
          this.commentSuccMsg=undefined
        },4000)
      }
    })
  }

  getAllComments(){
    this.courseRequestService.getAllCommentService().subscribe((res)=>{
      this.getAllCommentData=res
      this.reloadDataTable();

    })
  }

}
