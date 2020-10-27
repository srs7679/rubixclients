import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmersdataService {
  // private baseUrl ='https://rubixservices.herokuapp.com/farmersData/getFarmersDataAll';
  // private baseUrl2 = 'https://rubixservices.herokuapp.com/farmersData/saveFarmersData';
  // private baseUrl3 = "https://rubixservices.herokuapp.com/farmersData/getProductsByFarmerId?farmerId=6"

  private baseUrl ='http://localhost:8081/farmersData/getFarmersDataAll';
  private baseUrl2 = 'http://localhost:8081/farmersData/saveFarmersData';
  private baseUrl3 = 'http://localhost:8081/farmersData/getProductsByFarmerId'
  private baseUrl4 = 'http://localhost:8081/farmersData/getFarmersDataById'
  private baseUrl5 = 'http://localhost:8081/farmersData/updateFarmersData'
  private baseUrl6 = 'http://localhost:8081/farmersData/deletePhones'
  private baseUrl7 = 'http://localhost:8081/farmersData/saveProducts';
  private baseUrl8 = 'http://localhost:8081/farmersData/getProductByProductId';
  private baseUrl9 = 'http://localhost:8081/farmersData/updateProduct';
  private baseUrl10 = 'http://localhost:8081/farmersData/deleteProduct';
  private baseUrl11 = 'http://localhost:8081/farmersData/deleteFarmersData';
  constructor(private http: HttpClient) { }

  getFarmersList(): Observable<any> {
    return this.http.get(`${this.baseUrl }`);
  }
  addFarmersdata(farmers: object): Observable<object> {

    return this.http.post(`${this.baseUrl2}`,farmers);
  }
  getProductList(id: number): Observable<any>{
    return this.http.get(`${this.baseUrl3}/${id}`);
  }
  getFarmersById(id: number): Observable<any> {

    return this.http.get(`${this.baseUrl4}/${id}`);
  }
  updateFarmersdata(id: number,farmers: object): Observable<object> {

    return this.http.put(`${this.baseUrl5}/${id}`,farmers);
  }
  deletePhone(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl6}/${id}`, { responseType: 'text' });
  }
  addProducts(id: number,products: object): Observable<object> {

    return this.http.post(`${this.baseUrl7}/${id}`,products);
  }
  getProductByProductId(productId:number): Observable<any> {
    return this.http.get(`${this.baseUrl8}/${productId}`);
  }
  updateProduct(id: number,prodId:number,product: object): Observable<object> {

    return this.http.put(`${this.baseUrl9}/${id}/${prodId}`,product);
  }
  deleteFarmerdata(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl11}/${id}`, { responseType: 'text' });
  }
  deleteProduct(farmerId: number,productId:number): Observable<any> {
    return this.http.delete(`${this.baseUrl10}/${farmerId}/${productId}`, { responseType: 'text' });
  }
}
