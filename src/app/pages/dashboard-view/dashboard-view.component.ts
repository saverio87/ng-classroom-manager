import { Component, OnInit } from '@angular/core';
import {faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/app.state';
import {Store} from '@ngrx/store'
import { loadStudents } from 'src/app/state/students/students.actions';
import {loadClassrooms} from '../../state/classrooms/classrooms.actions'

import { selectAllClassrooms } from 'src/app/state/classrooms/classrooms.selectors';

import { selectAllStudents } from 'src/app/state/students/students.selectors';
import { Classroom } from 'src/app/models/classroom.model';
import { Student } from 'src/app/models/student.model';


@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  public allClassrooms$ = this.store.select(selectAllClassrooms);
  public allStudents$ = this.store.select(selectAllStudents);
  students: Student[];
  classrooms: Classroom[];

  faChalkboardTeacher = faChalkboardTeacher;


  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(loadClassrooms())
    this.store.dispatch(loadStudents())

    this.allStudents$.subscribe(data =>
      {
        if (data.length === 0) {
          this.store.dispatch(loadStudents())
        } 
        this.students = data;
      })

      this.allClassrooms$.subscribe((data) =>
      {
        if (data.length === 0) {
        this.store.dispatch(loadClassrooms())
        }
        this.classrooms = data
    }
      )

    
  }

}
