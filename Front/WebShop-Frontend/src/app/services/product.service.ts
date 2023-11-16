import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRequest } from '../models/product-request';
import { TokenService } from '../auth/services/token.service';
import { Product } from '../models/product';
import { BehaviorSubject, Observable, defer, finalize, from, lastValueFrom, map, switchMap } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CommentRequest } from '../models/commentRequest';
import { FilterProductsRequest } from '../models/fiter-products-request';
import { SoldProductRequest } from '../models/sold-product-request';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private headers: HttpHeaders;


  private apiUrl = 'http://localhost:9000/products';
  private apiUrlComments = 'http://localhost:9000/comments';
  private apiUrlOrders = 'http://localhost:9000/orders';
  private basePath = '/webshop';
  private downloadURL: string = '';
  selectedProduct: Product | undefined;

  private productAddedSource = new BehaviorSubject<boolean>(false);
  productAdded$ = this.productAddedSource.asObservable();

  constructor(private httpClient: HttpClient, private tokenService: TokenService, private db: AngularFireDatabase, private storage: AngularFireStorage) { 
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`
    });
  }

  announceProductAdded() {
    this.productAddedSource.next(true);
  }

  addProduct(request: ProductRequest){
    return this.httpClient.post<Product>(`${this.apiUrl}`, request, { headers: this.headers });
  }

  getProducts(page: number, size: number){
    const url = `${this.apiUrl}/getActive?page=${page}&size=${size}`;
    return this.httpClient.get<any>(url)
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new // Mapiranje "new" na "isNew"
            };
          });
          return { ...response, content: products };
        })
      );
  }


  deleteProduct(id:number){
    return this.httpClient.delete<Product>(`${this.apiUrl}/setInactive/${id}`, { headers: this.headers });
  }

  getProduct(id: number){
    return this.httpClient.get<Product>(`${this.apiUrl}/getById/${id}`);
  }

  getProductsByCtegory(category: string, page:number, size:number){
    const url = `${this.apiUrl}/${category}?page=${page}&size=${size}`;

    return this.httpClient.get<any>(url)
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new
            };
          });
          return { ...response, content: products };
        })
    );
  }

  addComment(request: CommentRequest){
    return this.httpClient.post<any>(`${this.apiUrlComments}`, request, { headers: this.headers })
  }

  getUsersActiveProducts(id: number, page: number, size: number){
    const url = `${this.apiUrl}/active/${id}?page=${page}&size=${size}`;
    console.log(url);

    return this.httpClient.get<any>(url, { headers: this.headers })
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new
            };
          });
          return { ...response, content: products };
        })
      );
  }

  getUsersSoldProducts(id: number, page: number, size: number) {
    const url = `${this.apiUrl}/sold/${id}?page=${page}&size=${size}`;

    return this.httpClient.get<any>(url, { headers: this.headers })
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new
            };
          });
          return { ...response, content: products };
        })
    );
  }

  getPurchasedProducts(id: number, page: number, size: number){
    const url = `${this.apiUrl}/getByCustomer/${id}?page=${page}&size=${size}`;

    return this.httpClient.get<any>(url, { headers: this.headers })
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new
            };
          });
          return { ...response, content: products };
        })
      );
  }

  filterByAttributes(request: FilterProductsRequest, page: number, size: number){

    const url = `${this.apiUrl}/filteredProducts?page=${page}&size=${size}`;

    return this.httpClient.post<any>(url, request)
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new
            };
          });
          return { ...response, content: products };
        })
      );
  }

  searchByName(name:string, page: number, size: number){

    const url = `${this.apiUrl}/search/${name}?page=${page}&size=${size}`;

    return this.httpClient.get<any>(url)
      .pipe(
        map(response => {
          const products = response.content.map((product: any) => {
            return {
              ...product,
              isNew: product.new
            };
          });
          return { ...response, content: products };
        })
      );
  }

  buyProduct(request: SoldProductRequest){
    return this.httpClient.post<any>(`${this.apiUrl}/sold`, request, { headers: this.headers });
  }

  orderProduct(address: String){
    return this.httpClient.post<any>(`${this.apiUrlOrders}/${address}`, { headers: this.headers });
  }
}
