import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  getMarketerList() {
    return this.http.get<any>(API_URL + '/users?role=marketer');
  }
  getSupplierList() {
    return this.http.get<any>(API_URL + '/users?role=supplier');
  }
  getDesignerList() {
    return this.http.get<any>(API_URL + '/users?role=designer');
  }
  getMarketerById(id: any) {
    return this.http.get<any>(API_URL + '/users/' + id);
  }
  getSupplierById(id: any) {
    return this.http.get<any>(API_URL + '/users/' + id);
  }
  getDesignerById(id: any) {
    return this.http.get<any>(API_URL + '/users/' + id);
  }

  deleteUser(id: any) {
    return this.http.delete<any>(API_URL + '/users/' + id);
  }

  putSupplier(min_pay: any, availability: any): Observable<any> {
    var url = '/users/';
    var data = {
      "min_pay": min_pay,
      "availability": availability
    }

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

}
