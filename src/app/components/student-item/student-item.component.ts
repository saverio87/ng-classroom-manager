import { Component, OnInit, Input } from '@angular/core';

import { Student } from 'src/app/models/student.model';

// Fontawesome
import { faMars, faVenus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPenToSquare, faTrashAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

import { deleteStudent } from 'src/app/state/students/students.actions';



@Component({
  selector: 'app-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {

  @Input() student:Student;
  constructor(private store: Store<AppState>) { }

  // Font Awesome
  faMars = faMars;
  faVenus = faVenus;
  faUser = faUser as IconProp;
  faPenToSquare = faPenToSquare as IconProp;
  faTrashAlt = faTrashAlt as IconProp;
  faEye = faEye;
  faTrash = faTrash;
  

  // Methods

  onDeleteStudent = (studentId:string) => {
    this.store.dispatch(deleteStudent({_id: studentId}))
  }


  ngOnInit(): void {
    
    

    
  }

}
