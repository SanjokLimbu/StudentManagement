import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularStudentManagement';
  constructor(private router: Router
  ) { }
  UserName!: string;
  Password!: string;
  Login(): void {
    if (this.UserName == "Admin" && this.Password == "Admin") {
      this.router.navigate(['student']);
    }
  }
}
