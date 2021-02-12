import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './Model/Users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public readonly baseURL = 'https://localhost:44321/';

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  LoginUser(userModel: User): Observable<void> {
    return this.http.post<any>(this.baseURL + "Account/Login", userModel).pipe(map(user => {
      // store user details in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  Logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    //this.currentUserSubject.next(null);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['nav-menu'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
