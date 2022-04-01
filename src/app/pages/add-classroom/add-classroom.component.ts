
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Font Awesome
import {  faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Classroom } from 'src/app/models/classroom.model';
import { Student } from 'src/app/models/student.model';
import { addClassroom } from 'src/app/state/classrooms/classrooms.actions';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {

  classroom: Classroom;
  faTrashAlt = faTrashAlt as IconProp;
  studentsToAdd:any[] = []
  addSingleStudent:boolean = true;
  notes:any[] = []
  groups: any[] = []
  activities: any[] = []

  name = new FormControl('')
  grade = new FormControl('')
  year = new FormControl('')


  addClassroomForm = this.formBuilder.group({
    name: this.name,
    grade: this.grade,
    year: this.year,
    notes: this.formBuilder.array([]),
    groups: this.formBuilder.array([]),
    activities: this.formBuilder.array([])
  })

  constructor(private router: Router, private store: Store<AppState>,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  // Methods

  onSubmit(): void {
    console.log(this.addClassroomForm.value);  
    this.store.dispatch(addClassroom({classroom: this.addClassroomForm.value}));
    this.addClassroomForm.reset();
  }

  

  
    
    // this.router.navigate(['/classrooms',this.classroom._id]);

  

}






  

  

  


