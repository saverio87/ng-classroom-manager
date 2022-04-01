import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store'
import { AppState } from 'src/app/app.state';
import { Classroom } from 'src/app/models/classroom.model';
import { Student } from 'src/app/models/student.model';
import { selectAllClassrooms } from 'src/app/state/classrooms/classrooms.selectors';
import { loadStudents } from 'src/app/state/students/students.actions';
import { selectAllStudents } from 'src/app/state/students/students.selectors';
import {loadClassrooms} from '../../state/classrooms/classrooms.actions'

import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-classroom-select',
  templateUrl: 'classroom-select.page.html',
  styleUrls: ['classroom-select.page.scss']
})



export class ClassroomSelectPage implements OnInit {

  constructor(private store: Store<AppState>) {
  
   }

   classrooms: Classroom[];
   students: Student[];
   studentsByClass: any[];

   faPlusCircle = faPlusCircle;

   public allClassrooms$ = this.store.select(selectAllClassrooms);
   public allStudents$ = this.store.select(selectAllStudents);

  ngOnInit() {

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

    // METHODS

    // Calculate students per classroom

    studentsPerClass = (classroomId:string):string => {
      let studentsPerClass = [...this.students].map(
        (student) => {
          const {_id} = student.classroom;   
                 
          return _id
        }
        
      ).filter((id)=>(
        id === classroomId
      )).length;

      return studentsPerClass.toString()
    }
    // Transforming students array to visualize it in template

    // Fetch students in each class

    studentsInClass = (classroomId: string) => {
      let studentsInClass = [...this.students].filter(
        (student)=> {
          return student.classroom._id == classroomId;
        }
      ).map((student)=> {
        const {_id, name, gender} = student
        return {_id, name, gender}
      })

      return studentsInClass
    }
    }