import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:9000/categories';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getAllCategories(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`
    });

    return this.http.get<any>(`${this.baseUrl}`);
  }
}
