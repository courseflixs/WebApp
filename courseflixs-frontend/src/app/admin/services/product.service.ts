import { Injectable } from '@angular/core';
import { Product } from '../data-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  sharedSingleProData: any
  constructor(private http: HttpClient) { }

  getAllProService() {
    return this.http.get<Product[]>(`${environment.apiUrl}/product/get-product`)
  }

  getSingleProServices(id: String) {
    return this.http.get(`${environment.apiUrl}/product/get-product/${id}`)

  }


  addProductService(data: FormData): Observable<any> {
    console.log("ProductService")
    const headers = new HttpHeaders();
    return this.http.post(`${environment.apiUrl}/product/add-product`, data, {
      headers,
      reportProgress: true,
      observe: 'events',
    })
  }


  deleteProService(id: String) {
    return this.http.delete(`${environment.apiUrl}/product/delete-product/${id}`)

  }


  updateProService(id:String,data:FormData):Observable<any>{
    const headers = new HttpHeaders();
    return  this.http.put(`${environment.apiUrl}/product/update-product/${id}`,data,{
      headers,
      reportProgress: true,
      observe: 'events',
    })
  }


  lockUnlockProService(id:String,lockStatus:String){
      return this.http.get(`${environment.apiUrl}/product/lock-product/${id}/${lockStatus}`)

  }
}

