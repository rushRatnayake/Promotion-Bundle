import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(public http: HttpClient) { }

  postImage(obj: any): Observable<any> {
    var url = '/images/upload';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

  getImage(name: any) {
    return this.http.get<any>(API_URL + '/static/' + name);
  }



}
