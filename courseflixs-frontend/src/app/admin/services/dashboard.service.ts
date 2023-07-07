import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }
  getAllDashboardDetailsService() {
    return this.http.get<any>(`${environment.apiUrl}/dashboard/get-dashboard`)
  }
  
}
