import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Model/Users';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(private router: Router,
    private service: SharedService) {
    if (this.service.currentUserValue) {
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
    this.service.LoginUser(userModel).subscribe(data => {
      console.log(data);
      this.router.navigate(['administration']);
    })
    //if (userModel.userName == "Admin@Limbu.com" && userModel.password == "Admin") {
    //  console.log("Hello World");
    //  this.router.navigate(['administration']);
    //}
  }
}
