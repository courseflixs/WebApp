import { Injectable } from '@angular/core';
import { Category } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  saveCategoryService(data: Category) {
    return this.http.post(`${environment.apiUrl}/category/add-category`, data)
  }
  getAllCategoryService() {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/get-category`)
  }
  getTypeWiseCatService(catType:String) {
    return this.http.get<Category[]>(`${environment.apiUrl}/category/get-typecat/${catType}`)
  }
  deleteCatService(id: String) {
    return this.http.delete(`${environment.apiUrl}/category/delete-category/${id}`)
  }
  getSingleCatService(id: String) {
    return this.http.get(`${environment.apiUrl}/category/get-category/${id}`)
  }
  updateCatService(id: String, data: Category) {
    return this.http.put(`${environment.apiUrl}/category/update-category/${id}`, data)

  }
}