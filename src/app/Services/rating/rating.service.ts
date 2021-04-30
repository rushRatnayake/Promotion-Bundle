import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';
import { DesignerRatings, SupplierRatings } from 'src/app/Models/user/user';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(public http: HttpClient) { }

  getAllSuppliers() {
    return this.http.get<any>(API_URL + '/rating');
  }


  postSupplierRating(obj: SupplierRatings): Observable<any> {

    var url = '/ratings';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }


  postDesignerRating(obj: DesignerRatings): Observable<any> {

    var url = '/ratings';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }



}
