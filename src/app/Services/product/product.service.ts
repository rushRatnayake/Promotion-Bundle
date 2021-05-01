import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API_URL } from 'src/app/app-global';
import { Product } from 'src/app/Models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }

  getAllProducts() {
    return this.http.get<any>(API_URL + '/products');
  }

  getProductCategories() {
    return this.http.get<any>(API_URL + '/products/categories');
  }

  getAllOthersProducts() {
    return this.http.get<any>(API_URL + '/products?signed=false');
  }

  getSupplierProducts() {
    return this.http.get<any>(API_URL + '/products?user_role=supplier');
  }

  getSingleProduct(id: any) {
    return this.http.get<any>(API_URL + '/products/' + id);
  }

  getRecommendedProducts(product_id: any) {
    return this.http.get<any>(API_URL + '/products/' + product_id + '/recommendations/');
  }

  getTrainRecommendation() {
    return this.http.get<any>(API_URL + '/products/recommendations?train=true');
  }

  getBundlePrice(base_product: any, selected_product: any) {
    return this.http.get<any>(API_URL + '/products/' + base_product + '/bundle/' + selected_product);
  }

  deleteProduct(id: any) {
    return this.http.delete<any>(API_URL + '/products/' + id);
  }

  searchProduct(product:String){
    return this.http.get<any>(API_URL + '/products?category='+product);
  }

  searchProductByName(product:String){
    return this.http.get<any>(API_URL + '/products?q='+product);
  }
  postProduct(obj: any): Observable<any> {
    var url = '/products';
    var data = obj;

    return this.http.post<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }

  updateProduct(obj: Product, ID: any): Observable<any> {
    var url = '/products/' + ID;
    var data = obj;

    return this.http.put<any>(API_URL + url, data)
      .pipe(
        tap(tokens => ''),
        catchError(error => {
          return of(error.error);
        }));
  }



}
