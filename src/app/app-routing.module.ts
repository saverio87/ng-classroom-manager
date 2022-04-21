import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomSelectPage } from './pages/classroom-select/classroom-select.page';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { StudentsViewComponent } from './pages/students-view/students-view.component';
import { AddStudentsComponent } from './pages/add-students/add-students.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentViewComponent } from './pages/student-view/student-view.component';
import { ClassroomViewComponent } from './pages/classroom-view/classroom-view.component';
import { AddClassroomComponent } from './pages/add-classroom/add-classroom.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardViewComponent
  },
  {
    path: 'add-classroom',
    component: AddClassroomComponent
  },
  {
    path: 'classrooms',
    component: ClassroomSelectPage
  },
  {
    path: 'classrooms/:classroomId',
    component: ClassroomViewComponent
  },
  {
    path: 'classrooms/:classroomId/add-students',
    component: AddStudentsComponent
  },
  {
    path: 'students',
    component: StudentsViewComponent
  },
  {path: 'students/:studentId', component: StudentViewComponent},
  {
    path: 'students/:studentId/edit-student',
    component: EditStudentComponent
  },



  // {'path': '/', component: ClassroomSelectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
