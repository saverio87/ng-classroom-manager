
import { createReducer, on } from '@ngrx/store';
import { Student } from '../../models/student.model';

import {loadStudents,
  loadStudentsSuccess,
  loadStudentsFailure,
  loadStudentsInClassroom,
  loadStudent,
  addStudent,
  addStudents,
  deleteStudent,
  deleteStudentSuccess,
  deleteStudentFailure,
  addStudentSuccess,
  addStudentFailure,
  addStudentsSuccess,
  addStudentsFailure, 
  updateContactDetails,
  updateContactDetailsSuccess,
  updateContactDetailsFailure,
  deleteContactDetails,
  deleteContactDetailsSuccess,
  deleteContactDetailsFailure,
  addAbsence,
  addAbsenceSuccess,
  addAbsenceFailure,
  deleteAbsence,
  deleteAbsenceSuccess,
  deleteAbsenceFailure,
  addFeedback,
  addFeedbackSuccess,
  addFeedbackFailure,
  deleteFeedback,
  deleteFeedbackSuccess,
  deleteFeedbackFailure
  
} from './students.actions';

import { resetAllStates } from '../index';


export interface StudentState {
  students: Student[];
  current: any | undefined,
  studentsInCurrentClass: Student[] | undefined;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: StudentState = {
  students: [],
  current: undefined,
  studentsInCurrentClass: undefined,
  error: null,
  status: 'pending'
}

export const studentReducer = createReducer(
  initialState, 

  // Reset State

  on(resetAllStates, (state) => ({
    ...initialState
  })),

  // Load student / Load students
  
  on(loadStudents, (state)=>(
    { ...state, status: 'loading' }
  )),

  on(loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students: students,
    error: null,
    status: 'success',
  })),

  on(loadStudentsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(loadStudent, (state, { studentId }) => ({
    ...state,
    current: state.students.filter(
      (student)=> {return student._id === studentId}
    )[0]
  })),

  on(loadStudentsInClassroom, (state, { classroomId }) => ({
    ...state,
    studentsInCurrentClass: state.students.filter(
      (student)=> {return student.classroom._id == classroomId}
    )
    
  })),

  // Add student / Add students

  // One student

  on(addStudent, (state, {student}) => ({
    ...state, 
    status: 'loading',
    students: [student, ...state.students]
   })),
  
  on(addStudentSuccess, (state) => ({
    ...state,
    status: 'success',
    error: null,
  })),

  on(addStudentFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  // Many students

  on(addStudents, (state, {students}) => ({
    ...state, 
    status: 'loading',
    students: [...students, ...state.students]
   })),
  
  on(addStudentsSuccess, (state) => ({
    ...state, 
    status: 'success',
    error: null
   })),
  
  on(addStudentsFailure, (state, {error}) => ({
    ...state, 
    status: 'error',
    error: error,
   })),

  // Delete student

  on(deleteStudent, (state, {_id}) => ({
    ...state, 
    status: 'loading',
    current: state.current._id == _id ? undefined: state.current,
    students: state.students.filter((student)=> {
      return student._id != _id
    })
   })),

   on(deleteStudentSuccess, (state) => ({
    ...state,
    status: 'success',
    error: null,
  })),

  on(deleteStudentFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),


  // Contact details - Create, update and delete

  on(updateContactDetails, (state, { _id, itemId, payload }) => (
    {
    ...state,
    students: state.students.map((student: any)=> {
      if (student._id == _id) {
        return {
          ...student,
          contact_details: student.contact_details.map(
            (item:any) => {
              if (item._id == itemId) {
                return {
                  ...item,
                  type: payload.type,
                  value: payload.value 
                }
              }
            return item }
  )
        }
      }
      return student
    }),
    current: {
      ...state.current,
      contact_details: state.current.contact_details.map(
                (item:any) => {
                  if (item._id == itemId) {
                    return {
                      ...item,
                      type: payload.type,
                      value: payload.value 
                    }
                  }
                return item }
      )},
    status: 'loading',
  })),

  on(updateContactDetailsSuccess, (state) => ({
    ...state,
    status: 'success',
    error: null
  })),

  on(updateContactDetailsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(deleteContactDetails, (state, { _id, itemId }) => (
    {
    ...state,
    students: state.students.map((student:any)=> {
      if (student._id == _id) {
        return {
          ...student,
          contact_details: student.contact_details.map(
            (item:any) => {
              if (item._id == itemId) {
                return {
                  ...item,
                  value: ""
                }
                
              }
              return item
            }
          )
        }
      }
      return student
    }),
    current: {
      ...state.current,
      contact_details: state.current.contact_details.map(
        (item:any) => {
          if (item._id == itemId) {
            return {
              ...item,
              value: ""
            }
            
          }
          return item
        }
      )
    
    },
    status: 'loading',
  })),

  on(deleteContactDetailsSuccess, (state) => (
    {
    ...state,
    status: 'success',
  })),

  on(deleteContactDetailsFailure, (state, {error}) => (
    {
      ...state,
      error: error,
      status: 'error',
  })),

  // REMINDER
  // State should be updated both in the student object in the array 'students'
  // and in the student object which gives 'current' its value. This is to avoid
  // that the non-updated student object gets passed to 'current' again before
  // the next API call

  // Absences - Add and delete

  on(addAbsence, (state, { _id, payload }) => (
    {
    ...state,
    students: state.students.map((student)=> {
      if (student._id == _id) { 
        return {
          ... student,
          absences: [payload, ...student.absences]
        }  
      }
      return student
    }),
    current: {
      ...state.current,
      absences: [payload, ...state.current.absences]
      },
    status: 'loading',
  })),

  on(addAbsenceSuccess, (state) => ({
    ...state,
    error: null,
    status: 'success',
  })),

  on(addAbsenceFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  

  on(deleteAbsence, (state, { _id, itemId }) => (
    {
    ...state,
    students: state.students.map((student)=> {
      if (student._id == _id) { 
        return {
          ... student,
          absences: student.absences.filter((item)=> {
            return item._id != itemId
          })
        }  
      }
      return student
    }),
    current: {
      ...state.current,
      absences: state.current.absences.filter(
        (item:any)=> {
          return item._id != itemId
        }
      )
    },
    status: 'loading',
  })),

  on(deleteAbsenceSuccess, (state) => (
    {
    ...state,
    status: 'success',
    error: null
  })),

  on(deleteAbsenceFailure, (state, {error}) => (
    {
      ...state,
      error: error,
      status: 'error',
  })),

  // Feedback - Add and delete

  on(addFeedback, (state, { _id, payload }) => (
    {
    ...state,
    students: state.students.map((student)=> {
      if (student._id == _id) { 
        return {
          ... student,
          feedback: [payload, ...student.feedback]
        }  
      }
      return student
    }),
    current: {
      ...state.current,
      feedback: [payload, ...state.current.feedback]
      },
    status: 'loading',
  })),

  on(addFeedbackSuccess, (state) => ({
    ...state,
    status: 'success',
    error: null,
  })),

  on(addFeedbackFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(deleteFeedback, (state, { _id, itemId }) => (
    {
    ...state,
    students: state.students.map((student)=> {
      if (student._id == _id) { 
        return {
          ... student,
          feedback: student.feedback.filter((item)=> {
            return item._id != itemId
          })
        }  
      }
      return student
    }),
    current: {
      ...state.current,
      feedback: state.current.feedback.filter(
        (item:any)=> {
          return item._id != itemId
        }
      )
    },
    status: 'loading',
  })),

  on(deleteFeedbackSuccess, (state) => (
    {
    ...state,
    status: 'success',
    error: null,
  })),

  on(deleteFeedbackFailure, (state, {error}) => (
    {
      ...state,
      error: error,
      status: 'error',
  })),



  )
