import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL, FILE_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public datepipe: DatePipe, public http: HttpClient) { }

  getDateOnDateTimeFormat(date: string): Date {
    return new Date(date);
  }

  getDateTimeOnDateFormat(datetime: Date) {
    //var a = new Date();
    var latest_date = this.datepipe.transform(datetime, 'yyyy-MM-dd');
    var date = latest_date?.toString();
    return date;
  }

  postImage(_data: FormData): Observable<any> {
    var url = '/upload';
    var data = _data;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

  // getImage(path: any) {
  //   var httpOptions = {
  //     headers: new HttpHeaders({ 'Accept': 'application/json, text/plain,image/png, */*' })
  //   };
  //   return this.http.get<any>(FILE_URL + '/' + path, httpOptions);
  // }

  async getImage(imageUrl: string): Promise<Observable<Blob>> {
    return this.http.get(FILE_URL + '/' + imageUrl, { responseType: 'blob' });
  }


}
