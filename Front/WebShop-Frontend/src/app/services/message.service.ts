import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { MessageRequest } from '../models/messageRequest';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:9000/messages';

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  addMessage(request: MessageRequest){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getAccessToken()}`
    });
    return this.httpClient.post<any>(`${this.apiUrl}`, request, { headers })
  }
}
