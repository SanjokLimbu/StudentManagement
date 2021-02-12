import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/Users';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private router: Router,
    private auth: AuthGuard) {
    // redirect to home if already logged in
    if (this.auth.currentUserValue) {
      this.router.navigate(['administration']);
    }
  }

  ngOnInit(): void {
  }
  userModel: User = {
    id!: null,
    userName!: null,
    password!: null,
    email!: null,
    token!: null
  }

  Login(userModel: User): void {
    this.auth.LoginUser(userModel).subscribe(data => {
      console.log(data);
      this.router.navigate(['administration']);
    })
  }
}
