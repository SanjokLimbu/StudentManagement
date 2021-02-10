import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './Model/Users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public readonly baseURL = 'https://localhost:44321/';

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    if (this.currentUser) {
      console.log("Logged In User");
      this.router.navigate(['administration']);
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }


  GetUser(): Observable<any[]> {
    return this.http.get<any>(this.baseURL + "api/GetUsers");
  }

  RegisterUser(userModel: User): Observable<User> {
    return this.http.post<User>(this.baseURL + "Account/Register", userModel);
  }
 }
