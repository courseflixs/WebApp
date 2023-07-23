import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Blog } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  sharedSingleBlogData:any;
  constructor(private http: HttpClient) { }
  getAllBlogsService() {
    return this.http.get<Blog[]>(`${environment.apiUrl}/blog/get-blog`)

  }
  getSingleBlogServices(id: String | null) {
    return this.http.get(`${environment.apiUrl}/blog/get-blog/${id}`)

  }

  addBlogService(data: FormData):Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${environment.apiUrl}/blog/add-blog`, data, {
      headers,
      reportProgress: true,
      observe: 'events',
    })
  }
  updateProService(id:String,data:FormData):Observable<any>{
    const headers = new HttpHeaders();
    return  this.http.put(`${environment.apiUrl}/blog/update-blog/${id}`,data,{
      headers,
      reportProgress: true,
      observe: 'events',
    })
  }


  deleteBlogService(id: String) {
    return this.http.delete(`${environment.apiUrl}/blog/delete-blog/${id}`)

  }
  getAllPublicAndCategoryBlog(catOrVisiblity:String){
    return this.http.get<Blog[]>(`${environment.apiUrl}/blog/get-public-blog/${catOrVisiblity}`)

  }
  getTopBlog(){
    return this.http.get<Blog[]>(`${environment.apiUrl}/blog/get-top-blog`)

  }
}
