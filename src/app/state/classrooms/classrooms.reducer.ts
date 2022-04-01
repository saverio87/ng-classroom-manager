import { createReducer, on } from '@ngrx/store';
import {Classroom} from '../../models/classroom.model';
import { addClassroomNote, addClassroomNoteSuccess, addClassroomNoteFailure, deleteClassroomNote, deleteClassroomNoteSuccess, deleteClassroomNoteFailure, loadClassroom, loadClassrooms, loadClassroomsFailure, loadClassroomsSuccess, addClassroom, addClassroomSuccess, addClassroomFailure, removeClassroom, removeClassroomSuccess, removeClassroomFailure } from './classrooms.actions';



export interface ClassroomState {
  classrooms: Classroom[];
  current: any | undefined;
  currentStudents: object[] | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ClassroomState = {
  classrooms: [],
  current: undefined,
  currentStudents: null,
  error: null,
  status: 'pending'
}

export const classroomReducer = createReducer(
  initialState, on(loadClassrooms, (state)=>(
    { ...state, status: 'loading' }
  )),

  // Classroom - LOAD / ADD / DELETE

  // Load classroom

  on(loadClassroomsSuccess, (state, { classrooms }) => ({
    ...state,
    classrooms: classrooms,
    error: null,
    status: 'success',
  })),

  on(loadClassroomsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(loadClassroom, (state, { classroomId }) => ({
    ...state,
    current: state.classrooms.filter(
      (classroom) => {return classroom._id === classroomId}
    )[0]
  })),

  // Add classroom

  on(addClassroom, (state, {classroom: classroom}) => ({
    ...state, 
    status: 'loading',
    classrooms: [classroom, ...state.classrooms]
   })),
  
  on(addClassroomSuccess, (state) => ({
    ...state,
    status: 'success',
    error: null,
  })),

  on(addClassroomFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // Delete classroom

  on(removeClassroom, (state, {_id}) => ({
    ...state, 
    status: 'loading',
    // If 'current' is the classroom that's being deleted, make it null
    current: state.current._id == _id ? undefined : state.current,
    classrooms: state.classrooms.filter((classroom)=> {
      return classroom._id != _id
    })
   })),

   on(removeClassroomSuccess, (state) => ({
    ...state,
    status: 'success',
    error: null,
  })),

  on(removeClassroomFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // Classroom Notes

  on(addClassroomNote, (state, {_id, payload}) => ({
    ...state,
    classrooms: state.classrooms.map((classroom)=> {
      if (classroom._id == _id) {
        return {
          ...classroom,
          notes: classroom.notes ? [payload, ...classroom.notes] : payload
        }
      }
      return classroom
    }),
    current: {
      ...state.current,
      notes: state.current.notes ? [payload, ...state.current.notes] : payload
    },
    status: 'loading'
  })),

  on(addClassroomNoteSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success',
  })),

  on(addClassroomNoteFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(deleteClassroomNote, (state, { _id, itemId }) => (
    {
    ...state,
    classrooms: state.classrooms.map((classroom)=> {
      if (classroom._id == _id) { 
        return {
          ...classroom,
          notes: classroom.notes?.filter((item)=> {
            return item._id != itemId
          })
        }  
      }
      return classroom
    }),
    current: {
      ...state.current,
      notes: state.current.notes.filter(
        (item:any)=> {
          return item._id != itemId
        }
      )
    },
    status: 'loading',
  })),

  on(deleteClassroomNoteSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success',
  })),

  on(deleteClassroomNoteFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  
  // on(addAbsence, (state, { _id, payload }) => (
  //   {
  //   ...state,
  //   students: state.students.map((student)=> {
  //     if (student._id == _id) { 
  //       return {
  //         ... student,
  //         absences: [payload, ...student.absences]
  //       }  
  //     }
  //     return student
  //   }),
  //   current: {
  //     ...state.current,
  //     absences: [payload, ...state.current.absences]
  //     },
  //   status: 'loading',
  // })),


  // on(addClassroom,
  //     (state, {classroom}) =>({
  //       ...state, classrooms:
  //       [...state.classrooms, {...classroom}]
  //     })),

)