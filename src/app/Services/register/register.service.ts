import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User_Designer, User_Marketer, User_Supplier } from 'src/app/Models/user/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  registerMarketer(obj: User_Marketer): Observable<any> {
    var url = '/users';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {

          return of(error.error);
        }));
  }

  registerDesigner(obj: User_Designer): Observable<any> {
    var url = '/users';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {

          return of(error.error);
        }));
  }

  registerSupplier(obj: User_Supplier): Observable<any> {
    var url = '/users';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        // mapTo(true),
        catchError(error => {

          return of(error.error);
        }));
  }

}
