import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// service: fetch items from api
@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private http: HttpClient) { }
  // get all product
  getItems() {
    return this.http.get('https://dummyjson.com/products')
  }
  // get product by id
  getItemById(id: number) {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
}

