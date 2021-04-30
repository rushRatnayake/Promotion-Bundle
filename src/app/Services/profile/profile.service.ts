import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';
import { User } from 'src/app/Models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http: HttpClient) { }

  getAllSuppliers() {
    return this.http.get<any>(API_URL + '/users?role=supplier');
  }

  getAllDesigners() {
    return this.http.get<any>(API_URL + '/users?role=designer');
  }

  getUserDetail(id: any) {
    return this.http.get<any>(API_URL + '/users/' + id);
  }

  // postBranch(obj: User): Observable<any> {
  //   var url = '/api/Branch/CreateBranch';
  //   var data = obj;

  //   return this.http.post<any>(API_URL + url, data)
  //     .pipe(
  //       tap(tokens => ''),
  //       catchError(error => {
  //         return of(error.error);
  //       }));
  // }

  updateUserDetail(obj: User): Observable<any> {
    var url = '/users';
    var data = obj;

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }



}
