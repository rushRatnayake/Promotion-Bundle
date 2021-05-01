import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(public http: HttpClient) { }

  postOrders(obj: any): Observable<any> {
    var url = '/orders';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

  postInvoice(obj: any, marketer_id: any): Observable<any> {
    var url = '/quotations/' + marketer_id;
    var data = obj;

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

  postQuotation(obj: any, marketer_id: any): Observable<any> {
    var url = '/quotations/' + marketer_id;
    var data = obj;

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }


}
