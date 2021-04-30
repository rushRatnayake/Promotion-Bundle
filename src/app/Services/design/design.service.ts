import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor(public http: HttpClient) { }

  getRequestedDesigns() {
    return this.http.get<any>(API_URL + '/designs');
  }

  getDesignSearch(status: any) {
    return this.http.get<any>(API_URL + '/designs?&status=' + status);
  }

  getRecommendedProducts() {
    return this.http.get<any>(API_URL + '/products/recommendations');
  }

  getAcceptor(id: any) {
    return this.http.get<any>(API_URL + '/designs/' + id + '/acceptors');
  }

  deleteProduct(id: any) {
    return this.http.delete<any>(API_URL + '/products/' + id);
  }


  postDesign(obj: any): Observable<any> {
    var url = '/designs';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }


  putAcceptDesign(id: any): Observable<any> {
    var url = '/designs/' + id;
    var data = {
      "status": "accepted"
    };

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

  putRejectDesign(id: any): Observable<any> {
    var url = '/designs/' + id;
    var data = {
      "status": "rejected"
    };

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }


  putConfirmDesign(obj: any, id: any): Observable<any> {
    var url = '/designs/' + id;
    var data = obj;

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }


}
