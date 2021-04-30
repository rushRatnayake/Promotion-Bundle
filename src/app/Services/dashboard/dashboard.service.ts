import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient) { }

  getMarketerDashboard() {
    return this.http.get<any>(API_URL + '/users/dashboard');
  }

}
