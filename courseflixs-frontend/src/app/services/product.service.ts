import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../admin/data-type';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  getAllProService() {
     return this.http.get<Product[]>(`${environment.apiUrl}/product/get-product`)
  }
  getAllShowSliderProServices() {
    return this.http.get<Product[]>(`${environment.apiUrl}/end-user/products/get-products/Show`)
  }

  getAllRecommendedProServices() {
    return this.http.get<Product[]>(`${environment.apiUrl}/end-user/products/get-products/Recommended`)

  }
  getAllNewProServices() {
    return this.http.get<Product[]>(`${environment.apiUrl}/end-user/products/get-products/New`)

  }
  getSingleProDetails(proID:String | null){
    return this.http.get<Product[]>(`${environment.apiUrl}/end-user/products/get-singlepro/${proID}`)

  }
getCategoryWiseProService(category:String | null){
  return this.http.get<Product[]>(`${environment.apiUrl}/end-user/products/get-cat-pro/${category}`)

}
}
