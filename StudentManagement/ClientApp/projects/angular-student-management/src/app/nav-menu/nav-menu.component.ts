import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/Users';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private router: Router) { }

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
    if (userModel.userName == "Admin@Limbu.com" && userModel.password == "Admin") {
      console.log("Hello World");
      this.router.navigate(['administration']);
    }
  }
}
