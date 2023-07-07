import { Component, OnInit, ViewChild } from '@angular/core';
import { TestimonialService } from '../services/testimonial.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { FormControl, FormGroup } from '@angular/forms';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { environment } from '../../../environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  // Data table reload Setting
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtTrigger: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  selected = undefined
  isTestiCrudMsg: String | undefined;
  getTestiData: any;
  getSingleTestiData: any;
  dtOptions: any = {};
  viewImgDialogue: String = ''
  viewVideoUrl: String = ''
  viewDialogueTitle: String = ''
  progress: number = 0;

  constructor(private testimoService: TestimonialService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 1 },
        { responsivePriority: 2, targets: -1 }
      ]
    };
    setTimeout(() => {
      this.loadUpdatedTesti()

    }, 180)
  }

  reloadDataTable(): void {
    if (this.datatableElement && this.datatableElement.dtInstance) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next('');
      });
    }
  }


  testimonialForm = new FormGroup({
    testimonialName: new FormControl(''),
    testimonialImage: new FormControl(null),
    updatedTestimonialImg: new FormControl('')
  })



  clearInput() {
    this.testimonialForm.get('testimonialName')?.reset()
    this.testimonialForm.get('testimonialImage')?.reset()
    this.getSingleTestiData = null;
    this.progress = 0;

  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      console.log(event.target.files)
      const file = event.target.files[0];
      this.testimonialForm.patchValue({
        testimonialImage: file
      });
    }

  }


  getImageUrlAtUpdate(filename: String, dialogueTitle: String) {
    this.viewVideoUrl = ''
    this.viewImgDialogue = ''
    if (filename.split('.')[1] === 'png' || filename.split('.')[1] === 'jpg' || filename.split('.')[1] === 'jpeg' || filename.split('.')[1] === 'gif') {
      this.viewImgDialogue = `${environment.apiUrl}/image/testimonial/${filename}`;
      this.viewDialogueTitle = dialogueTitle;
    } else {
      this.viewVideoUrl = `${environment.apiUrl}/image/testimonial/${filename}`;
      this.viewDialogueTitle = "Audio/Video"
    }
  }
  resetVideoUrl() {
    this.viewVideoUrl = ''
    this.viewImgDialogue = ''
  }
  loadUpdatedTesti() {
    this.testimoService.getAllTestimonialService().subscribe(async (result) => {
      // console.log(result)
      this.getTestiData = await result;
      // console.log(this.getTestiData)
      this.reloadDataTable();

    })
  }

  commonInAddUpdateDelete(msg: String) {
    this.isTestiCrudMsg = msg
    this.loadUpdatedTesti()
    setTimeout(() => {
      this.isTestiCrudMsg = undefined;

    }, 4000)

  }
  getImageUrl(filename: string): string {
    return `${environment.apiUrl}/image/testimonial/${filename}`;
  }
  addTestimonial() {
    const formData = new FormData()
    formData.append('testimonialName', this.testimonialForm.get("testimonialName")?.value || '')
    formData.append('updatedTestimonialImg', this.testimonialForm.get("updatedTestimonialImg")?.value || '')
    formData.append('testimonialImage', this.testimonialForm.get("testimonialImage")?.value || '')

    this.testimoService.saveTestimonialService(formData).subscribe((event: HttpEvent<any>) => {

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
          if (event.body) {
            setTimeout(() => {
              this.closebutton.nativeElement.click();
              this.commonInAddUpdateDelete("Testimonial added successfully!!")
            }, 600)

          }

      }
    })
  }


  deleteTesti(id: String) {
    console.log("delete id" + id);
    this.testimoService.deleteTastiService(id).subscribe(async (deResult) => {
      console.log(deResult)
      this.commonInAddUpdateDelete("Testimonial deleted successfully!!")
    })
  }


  getSingleTesti(id: String) {
    this.progress = 0;
    this.testimoService.getSingleTestiService(id).subscribe((result) => {
      console.log("this is single cat result")
      console.log(result)
      this.testimonialForm.get('testimonialName')?.setValue('')
      this.getSingleTestiData = result;
      this.selected = this.getSingleTestiData.type_of_Testimonial
    })
  }


  updateTesti(id: String) {
    const formData = new FormData
    formData.append('testimonialName', this.testimonialForm.get("testimonialName")?.value || '')
    formData.append('updatedTestimonialImg', this.testimonialForm.get("updatedTestimonialImg")?.value || '')
    formData.append('testimonialImage', this.testimonialForm.get("testimonialImage")?.value || '')

    console.log("update console")
    this.testimoService.updateTestiService(id, formData).subscribe((event: HttpEvent<any>) => {
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
          if (event.body) {
            setTimeout(() => {
              this.closebutton.nativeElement.click();
              this.commonInAddUpdateDelete("Testimonial updated successfully!!")
            }, 600)

          }

      }
    })
  }


  openConfirmationDialog(id: String): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '30rem',
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to delete the Testimonial?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteTesti(id);
      } else {
        console.log("No opration")
      }
    });
  }
}
