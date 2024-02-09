import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../admin/services/testimonial.service';
import { environment } from '../../../environments/environment';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-testimonial-section',
  templateUrl: './testimonial-section.component.html',
  styleUrls: ['./testimonial-section.component.css']
})
export class TestimonialSectionComponent implements OnInit{
  getAllTetimoData:any;
  // viewVideoUrl: String | undefined
  // viewDialogueTitle: String | undefined
  constructor(private testimoService:TestimonialService,private _commonService:CommonService){}
ngOnInit(): void {
  this._commonService.showLoader()
  this.testimoService.getAllTestimonialService().subscribe((result)=>{
    this._commonService.hideLoader()
      this.getAllTetimoData=result;
      console.log(this.getAllTetimoData)
  })
}
getAudioVideoURL(fileName:String){
return `${environment.apiUrl}/image/testimonial/${fileName}`
}
}
