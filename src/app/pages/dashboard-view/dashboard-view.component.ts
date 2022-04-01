import { Component, OnInit } from '@angular/core';
import {faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';

import { AppState } from 'src/app/app.state';
import {Store} from '@ngrx/store'
import { loadStudents } from 'src/app/state/students/students.actions';

import {loadClassrooms} from '../../state/classrooms/classrooms.actions'

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

  faChalkboardTeacher = faChalkboardTeacher;


  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(loadClassrooms())
    this.store.dispatch(loadStudents())

    
  }

}
