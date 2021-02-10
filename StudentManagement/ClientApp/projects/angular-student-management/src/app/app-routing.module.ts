import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { StudentComponent } from './administration/student/student.component';
import { TeacherComponent } from './administration/teacher/teacher.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

const route: Routes = [
  {
    path: 'administration', component: AdministrationComponent, children: [
      { path: 'teacher', component: TeacherComponent },
      { path: 'student', component: StudentComponent },
      { path: '', component: TeacherComponent, pathMatch: 'full' }
      ]
  },
  { path: 'nav-menu', component: NavMenuComponent },
  { path: '', component: NavMenuComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
