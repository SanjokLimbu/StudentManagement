import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './Model/Users';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Local } from 'protractor/built/driverProviders';

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
    return this.http.get<any[]>(this.baseURL + "Account/GetUsers");
  }

  RegisterUser(userModel: User): Observable<User> {
    return this.http.post<User>(this.baseURL + "Account/Register", userModel);
  }

  LoginUser(userModel: User): Observable<void> {
    return this.http.post<any>(this.baseURL + "Account/Login", userModel).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }
 }
