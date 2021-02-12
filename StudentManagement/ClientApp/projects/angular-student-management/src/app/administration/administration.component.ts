import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { User } from '../Model/Users';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  currentUser!: User;
  constructor(private auth: AuthGuard) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  LoggedIn() {
    return localStorage.getItem('currentUser');
  }

  Logout() {
    console.log("Logout");
    this.auth.Logout();
  }
}
