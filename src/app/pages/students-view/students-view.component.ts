import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.state';
import {Store} from '@ngrx/store'
import { selectAllClassrooms } from 'src/app/state/classrooms/classrooms.selectors';
import { selectAllStudents } from 'src/app/state/students/students.selectors';
import {Classroom} from '../../models/classroom.model'
import { Student } from 'src/app/models/student.model';
import { deleteStudent, loadStudents } from 'src/app/state/students/students.actions';
import { loadClassrooms } from 'src/app/state/classrooms/classrooms.actions';

import {faMars, faVenus} from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.scss']
})
export class StudentsViewComponent implements OnInit {

  faMars = faMars;
  faVenus = faVenus;
  students: Student[];
  studentsByName: Student[];
  classrooms: Classroom[];
  sortingMethod: 'alphabet' | 'classroom' | 'sex';

  public allClassrooms$ = this.store.select(selectAllClassrooms);
  public allStudents$ = this.store.select(selectAllStudents);


  constructor(private store:Store<AppState>) { 

    
  }

  ngOnInit(): void {
    console.log("FIRED FROM STUDENT SELECT PAGE");
    console.log(localStorage.getItem("state"));
    


    this.sortingMethod = 'alphabet';

    this.allClassrooms$.subscribe((data) =>
      {
        if (data.length === 0) {
        this.store.dispatch(loadClassrooms())
        }
        this.classrooms = data
    }
      )

      this.allStudents$.subscribe((data) =>
      {
        if (data.length === 0) {
        this.store.dispatch(loadStudents())
        }
        this.students = data;

    }
      )




}

  // METHODS
  
  // Change sorting method

  changeSortingMethod = (sortingMethod:string) => {

    switch (sortingMethod) {
      case 'alphabet': 
       this.sortingMethod = 'alphabet'
       break
      case 'classroom':
       this.sortingMethod = 'classroom'
       break
      case 'sex':
       this.sortingMethod = 'sex'
      //  this.displayStudentsBySex(this.students)
       break
      
       
    }

  }

  // Display students by ...

  displayStudentsByName = (students:any[]) => {
   let sortedStudents = [...students].sort((a,b) => a.name > b.name ? 1 : -1)
  return sortedStudents
  }


  displayStudentsBySex = (students:Student[]):any[] => {
    const newItems = [...students].map(
      (student)=> {
        let {gender} = student;
        return {
          gender: gender,
        students: students.filter(
          student => student.gender === gender
        )};

      }
    )
    // Removing all duplicate objects
    .filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
    
    return newItems
  }

  displayStudentsByClassroom = (students:Student[]):any[] => {
      
    const newItems = [...students].map(
      (student)=> {
        let {classroom} = student;
        return {
          ...classroom,
        students: students.filter(
          student => student.classroom._id === classroom._id
        )};

      }
    )
    // Removing all duplicate objects
    .filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)
    
    return newItems

    }


}