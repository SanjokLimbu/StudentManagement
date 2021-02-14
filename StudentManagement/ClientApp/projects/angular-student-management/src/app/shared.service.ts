import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  DeleteUser(id: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<any>(this.baseURL + "Account/Delete" + "/" + id, options);
  }
 }
