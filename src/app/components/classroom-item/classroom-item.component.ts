import { Component, OnInit, Input } from '@angular/core';
import { Classroom } from 'src/app/models/classroom.model';

// Fontawesome
import { faPenToSquare, faTrashAlt, faUser, faEye } from '@fortawesome/free-regular-svg-icons';
// import {gear} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// NgRx Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { removeClassroom } from 'src/app/state/classrooms/classrooms.actions';


@Component({
  selector: 'app-classroom-item',
  templateUrl: './classroom-item.component.html',
  styleUrls: ['./classroom-item.component.scss']
})
export class ClassroomItemComponent implements OnInit {

  faEye = faEye as IconProp;
  faUser = faUser as IconProp;
  faPenToSquare = faPenToSquare as IconProp;
  faTrashAlt = faTrashAlt as IconProp;

  
  
  @Input() classroom:Classroom;
  @Input() studentsNumber:string;
  @Input() studentsInClass:any;


  constructor(private store: Store<AppState>) { 
  }

  // Methods

  onRemoveClassroom = (classroomId:string) => {
    this.store.dispatch(removeClassroom({_id: classroomId}))
  }


  ngOnInit(): void {    
    
  }

}
