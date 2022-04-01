
import {ClassroomState } from './state/classrooms/classrooms.reducer'
import { StudentState } from './state/students/students.reducer'

export interface AppState {
  classrooms: ClassroomState;
  students: StudentState;
}
