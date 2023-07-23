import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  addProIntoWishlistService(data:any){
    return this.http.post(`${environment.apiUrl}/end-user/wishlist/add-wishlist`,data);
  }
  getProFromWishlistService(userID:String | null){
    return this.http.get(`${environment.apiUrl}/end-user/wishlist/get-wishlist/${userID}`);
  }

  deleteProFromWishlistService(wishID:String){
    return this.http.delete(`${environment.apiUrl}/end-user/wishlist/delete-wishlist/${wishID}`);

  }
  
}
