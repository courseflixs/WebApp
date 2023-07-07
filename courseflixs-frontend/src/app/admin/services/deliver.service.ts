import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {
  sharedSingleDeliveryData:any
  constructor(private http:HttpClient) { }
  addDeliveryService(data:any){
    return this.http.post(`${environment.apiUrl}/delivery/add-delivery`, data)

  }
  getAllDeliveryService() {
    return this.http.get<any>(`${environment.apiUrl}/delivery/get-delivery`)
  }
  
  deleteDeliveryService(id: String) {
    return this.http.delete(`${environment.apiUrl}/delivery/delete-delivery/${id}`)
  }
  getSingleDeliveryService(id: String) {
    return this.http.get(`${environment.apiUrl}/delivery/get-delivery/${id}`)
  }
  updateDeliveryService(id: String, data: any) {
    return this.http.put(`${environment.apiUrl}/delivery/update-delivery/${id}`, data)

  }

}
