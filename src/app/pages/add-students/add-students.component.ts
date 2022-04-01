import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

// Font Awesome
import {  faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Classroom } from 'src/app/models/classroom.model';
import { Student } from 'src/app/models/student.model';
import { selectCurrentClassroom } from 'src/app/state/classrooms/classrooms.selectors';
import { addStudent, addStudents } from 'src/app/state/students/students.actions';


@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss']
}) 
export class AddStudentsComponent implements OnInit {

  // Variables

  classroom: Classroom;
  faTrashAlt = faTrashAlt as IconProp;
  studentsToAdd:any[] = []
  addSingleStudent:boolean = true;

  constructor(private router: Router, private store: Store<AppState>,private formBuilder: FormBuilder) { }

  // Selectors

  public currentClassroom$ = this.store.select(selectCurrentClassroom);

  // Methods

  // Open and close a modal

  toggleModal = (el: string) => {
    const item = document.getElementById(el);
    if (item) {
      item.classList.toggle('is-active');
    }
  }

  // Delete these two
  
  openModal = (el: string) => {
    const item = document.getElementById(el);
    if (item) {
      item.classList.add('is-active');
    }
  }

  closeModal = (el: string) => {
    const item = document.getElementById(el);
    if (item) {
      item.classList.remove('is-active');
    }
  }



  onSubmit = (studentArray:Student[]) => {
    if (studentArray.length == 1) {
      // console.log(studentArray[0]);
      this.store.dispatch(addStudent({student: studentArray[0]}));
    } else {
      // console.log(studentArray);
      this.store.dispatch(addStudents({students: studentArray}));
    }    
    this.router.navigate(['/classrooms',this.classroom._id]);
  }

  removeStudent = (id:number) => {    
    this.studentsToAdd = this.studentsToAdd.filter((el, index) => {      
      return index !== id
    })
  }

  onToggleSubmissionMethod = (e:Event):void => {
    e.preventDefault;
    this.addSingleStudent = !this.addSingleStudent
  }

  onSubmitLeft(): void {
    this.addStudentForm.value.classroom = {
      _id: this.classroom._id,
      name: this.classroom.name
    };

    this.studentsToAdd.push
    (this.addStudentForm.value)

    this.addStudentForm.reset();
  }

  onSubmitRight(): void {
    const names = this.addStudentForm.value.name.split(/\r?\n/);
    for (let i in names) {
      
      this.studentsToAdd.push({
        name: names[i],
        gender: undefined,
        email: undefined,
        phone: undefined,
        classroom: {
          _id: this.classroom._id,
          name: this.classroom.name
        }
      })
    }
    this.addStudentForm.reset();
  }

  name = new FormControl('')
  gender = new FormControl('')
  email = new FormControl('')
  phone = new FormControl('')


  addStudentForm = this.formBuilder.group({
    name: this.name,
    gender: this.gender,
    email: this.email,
    phone: this.phone,
  })


  ngOnInit(): void {
    
    this.currentClassroom$.subscribe((data)=> {
      if (data) {
        this.classroom = data;

      }
    })
    
  }

  

}
