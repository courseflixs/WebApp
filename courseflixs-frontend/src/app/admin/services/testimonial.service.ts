import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  constructor(private http: HttpClient) { }

  saveTestimonialService(data: FormData):Observable<any>  {
    const headers = new HttpHeaders();

    return this.http.post(`${environment.apiUrl}/testimonial/add-testimonial`, data,{
      headers,
      reportProgress: true,
      observe: 'events',
    })
  }
  getAllTestimonialService() {
    return this.http.get<any>(`${environment.apiUrl}/testimonial/get-testimonial`)
  }
 
  deleteTastiService(id: String) {
    return this.http.delete(`${environment.apiUrl}/testimonial/delete-testimonial/${id}`)
  }
  getSingleTestiService(id: String) {
    return this.http.get(`${environment.apiUrl}/testimonial/get-testimonial/${id}`)
  }
  updateTestiService(id: String, data: FormData):Observable<any>  {
    const headers = new HttpHeaders();
    return this.http.put(`${environment.apiUrl}/testimonial/update-testimonial/${id}`, data,{
      headers,
      reportProgress: true,
      observe: 'events',
    })

  }
}
