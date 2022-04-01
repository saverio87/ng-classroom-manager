import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { localStorageSync } from 'ngrx-store-localstorage';
// import { reducers } from './reducers';

// NgRX Reducers / Effects

import {reducers, metaReducers} from './state/index';
import {StudentState} from './state/students/students.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClassroomsEffects } from './state/classrooms/classrooms.effects';
import { classroomReducer } from './state/classrooms/classrooms.reducer';
import { studentReducer } from './state/students/students.reducer';
import { StudentsEffects } from './state/students/students.effects';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassroomSelectPage } from './pages/classroom-select/classroom-select.page';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { ClassroomItemComponent } from './components/classroom-item/classroom-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { StudentsViewComponent } from './pages/students-view/students-view.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddStudentsComponent } from './pages/add-students/add-students.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentViewComponent } from './pages/student-view/student-view.component';
import { PersistanceService } from './services/persistance.service';
import { ClassroomViewComponent } from './pages/classroom-view/classroom-view.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalModule } from './components/modal/modal.module';

// Third party plugins

import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { HydrationEffects } from './state/hydration/hydration.effects';
import { AddClassroomComponent } from './pages/add-classroom/add-classroom.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { JwPaginationModule } from 'jw-angular-pagination';


@NgModule({
  declarations: 
  [
    AppComponent,
    PaginationComponent,
    ClassroomSelectPage,
    ClassroomItemComponent,
    StudentItemComponent,
    DashboardViewComponent,
    StudentsViewComponent,
    NavbarComponent,
    AddStudentsComponent,
    EditStudentComponent,
    StudentViewComponent,
    ClassroomViewComponent,
    AddClassroomComponent,
    PaginationComponent,
  ],
  imports: [
    JwPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([HydrationEffects, ClassroomsEffects, StudentsEffects]),
    HttpClientModule,
    FontAwesomeModule,
    ModalModule

  ],
  providers: [
    PersistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



