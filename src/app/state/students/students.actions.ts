import {createAction,props} from '@ngrx/store';
import { Student } from '../../models/student.model';

// Student - Add, Remove, Load

export const addStudent = createAction(
  '[Add Students Page] Add Student',
  props<{student: Student}>()
)

export const addStudentSuccess = createAction(
  '[Add Students Page] Add Student Success'
)
export const addStudentFailure = createAction(
  '[Add Students Page] Add Student Failure',
  props<{error: string}>()
)

export const addStudents = createAction(
  '[Add Students Page] Add Students',
  props<{students: Student[]}>()
)

export const addStudentsSuccess = createAction(
  '[Add Students Page] Add Student Success'
)
export const addStudentsFailure = createAction(
  '[Add Students Page] Add Student Failure',
  props<{error: string}>()
)

export const deleteStudent = createAction(
  '[Students View Page] Delete Student',
  props<{_id: string}>()
)

export const deleteStudentSuccess = createAction(
  '[Students View Page] Delete Student Success'
)

export const deleteStudentFailure = createAction(
  '[Students View Page] Delete Student Failure',
  props<{error: string}>()
)

// Remove student

export const removeStudent = createAction(
  '[Student View Page] Remove Student',
  props<{id: string}>()
)

export const removeStudentSuccess = createAction(
  '[Student View Page] Remove Student Success'
)
export const removeStudentFailure = createAction(
  '[Student View Page] Remove Student Failure',
  props<{error: string}>()
)

// Load students

export const loadStudents = createAction(
  '[Classroom Select Page] Load Students'
)

export const loadStudentsSuccess = createAction(
  '[Classroom Select Page] Students Load Success',
props<{ students: Student[] }>()
)

export const loadStudentsFailure = createAction(
  '[Classroom Select Page] Students Load Failure',
props<{ error: string }>()
)

export const loadStudentsInClassroom = createAction(
  '[Classroom View Page] Load Students In Classroom',
  props<{ classroomId: string }>()
)

export const loadStudent = createAction(
  '[Student View Page] Load Student',
  props<{ studentId: string}>()
)

// Contact details - Create / Update / Delete

export const updateContactDetails = createAction(
  '[Student View Page] Update Contact Details',
  props<{_id: string, itemId: string, payload: any}>()
)

export const updateContactDetailsSuccess = createAction(
  '[Student View Page] Update Contact Details Success'
)

export const updateContactDetailsFailure = createAction(
  '[Student View Page] Update Contact Details Failure',
  props<{ error: string }>()
)

export const deleteContactDetails = createAction(
  '[Student View Page] Delete Contact Details',
  props<{_id: string, itemId: string}>()
)

export const deleteContactDetailsSuccess = createAction(
  '[Student View Page] Delete Contact Details Success'
)

export const deleteContactDetailsFailure = createAction(
  '[Student View Page] Delete Contact Details Failure',
  props<{ error: string }>()
)

// Absences - Add / Delete

export const addAbsence = createAction(
  '[Student View Page] Add Absence',
  props<{_id: string, payload: any}>()
)

export const addAbsenceSuccess = createAction(
  '[Student View Page] Add Absence Success'
)
export const addAbsenceFailure = createAction(
  '[Student View Page] Add Absence Failure',
  props<{error: string}>()
)

export const deleteAbsence = createAction(
  '[Student View Page] Delete Absence',
  props<{_id: string, itemId: string}>()
)

export const deleteAbsenceSuccess = createAction(
  '[Student View Page] Delete Absence Success'
)

export const deleteAbsenceFailure = createAction(
  '[Student View Page] Delete Absence Failure',
  props<{ error: string }>()
)

// Feedback - Add / Delete

export const addFeedback = createAction(
  '[Student View Page] Add Feedback',
  props<{_id: string, payload: any}>()
)

export const addFeedbackSuccess = createAction(
  '[Student View Page] Add Feedback Success'
)
export const addFeedbackFailure = createAction(
  '[Student View Page] Add Feedback Failure',
  props<{error: string}>()
)

export const deleteFeedback = createAction(
  '[Student View Page] Delete Feedback',
  props<{_id: string, itemId: string}>()
)

export const deleteFeedbackSuccess = createAction(
  '[Student View Page] Delete Feedback Success'
)

export const deleteFeedbackFailure = createAction(
  '[Student View Page] Delete Feedback Failure',
  props<{ error: string }>()
)



