import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';
import { Product } from 'src/app/Models/product/product';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(public http: HttpClient) { }

  getAllQuotations() {
    return this.http.get<any>(API_URL + '/quotations');
  }

  getSingleQuotation(id: any) {
    return this.http.get<any>(API_URL + '/quotations/' + id);
  }

  postQuotations(obj: any): Observable<any> {
    debugger;
    var url = '/quotations';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }


  putAcceptQuotation(id: any): Observable<any> {
    debugger;
    var url = '/quotations/' + id;
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


  putRejectQuotation(id: any): Observable<any> {
    debugger;
    var url = '/quotations/' + id;
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


  putSupplierUploadQuotation(id: any, file: any): Observable<any> {
    debugger;
    var url = '/quotations/' + id;
    var data = {
      "invoice": file
    };

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

}
