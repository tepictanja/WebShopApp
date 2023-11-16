import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { SignUpRequest } from 'src/app/models/sign-up-request';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl = 'http://localhost:9000';

  constructor(private httpClient: HttpClient) { }

  signUp(request : SignUpRequest): Observable<any>{
    return this.httpClient.post(`${this.apiUrl}/sign-up`, request);
  }

  login(request : LoginRequest) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }

  activate(username : string, pin : string){
    return this.httpClient.post(`${this.apiUrl}/activate`, {username, pin});
  }

}
