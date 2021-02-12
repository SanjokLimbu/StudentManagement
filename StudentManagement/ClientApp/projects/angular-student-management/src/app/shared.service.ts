import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './Model/Users';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public readonly baseURL = 'https://localhost:44321/';

  constructor(private http: HttpClient) {
  }

  GetUser(): Observable<any[]> {
    return this.http.get<any[]>(this.baseURL + "Account/GetUsers");
  }

  RegisterUser(userModel: User): Observable<User> {
    return this.http.post<User>(this.baseURL + "Account/Register", userModel);
  }
 }
