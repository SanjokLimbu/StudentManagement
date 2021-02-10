import { Component, OnInit } from '@angular/core';
import { User } from '../../Model/Users';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})


export class TeacherComponent implements OnInit {
  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }
  RegisteredUserList: any = [];
  userModel: User = {
    id!: null,
    userName!: null,
    password!: null,
    email!: null,
    token!: null
  }


  AddEmployeePreview = false;
  toggleAddEmployee(): void {
   this.AddEmployeePreview = !this.AddEmployeePreview;
  }

  populateTable() {
    this.service.GetUser().subscribe(data => {
      this.RegisteredUserList = data;
    });
  }

  Register(userModel: User): void {
    this.service.RegisterUser(userModel).subscribe((data) => {
      console.log(data);
      alert("Registration Successful.");
    });
  }
}
