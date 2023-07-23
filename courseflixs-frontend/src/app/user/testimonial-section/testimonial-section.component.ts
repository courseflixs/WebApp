import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../admin/services/testimonial.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-testimonial-section',
  templateUrl: './testimonial-section.component.html',
  styleUrls: ['./testimonial-section.component.css']
})
export class TestimonialSectionComponent implements OnInit{
  getAllTetimoData:any;
  // viewVideoUrl: String | undefined
  // viewDialogueTitle: String | undefined
  constructor(private testimoService:TestimonialService){}
ngOnInit(): void {
  this.testimoService.getAllTestimonialService().subscribe((result)=>{
      this.getAllTetimoData=result;
      console.log(this.getAllTetimoData)
  })
}
getAudioVideoURL(fileName:String){
return `${environment.apiUrl}/image/testimonial/${fileName}`
}
}
