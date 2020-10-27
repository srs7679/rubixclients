import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/product/getProduct';
  private baseUrl1 = 'http://localhost:8081/product/saveProduct';
  private baseUrl2 = 'http://localhost:8081/product/updateProduct';
  private baseUrl3 = 'http://localhost:8081/product/saveFeedback';
  private baseUrl4 = 'http://localhost:8081/product/updateFeedback';
  
  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  getProductList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createProduct(product: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl1}`, product);
  }

  updateProduct(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl2}/${id}`, value);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  createFeedback(feedback: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl3}`, feedback);
  }

  updateFeedback(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl4}/${id}`, value);
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

 }
