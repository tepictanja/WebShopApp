import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { UserUpdateRequest } from '../models/userUpdateRequest';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:9000/users';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  updateUser(request: UserUpdateRequest){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`
    });
    
    return this.http.put<User>(`${this.baseUrl}/` + this.tokenService.getUser().username, request, { headers })
  }
}
