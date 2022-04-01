
import {createAction,props} from '@ngrx/store';
import { Classroom } from '../../models/classroom.model';

// Classroom - ADD / REMOVE

export const addClassroom = createAction(
  '[Add Classroom Page] Add Classroom',
  props<{classroom: Classroom}>()
)

export const addClassroomSuccess = createAction(
  '[Add Classroom Page] Add Classroom Success'
)

export const addClassroomFailure = createAction(
  '[Add Classroom Page] Add Classroom Failure',
  props<{ error: string }>()
)

export const removeClassroom = createAction(
  '[Classroom Select Page] Remove Classroom',
  props<{_id: string}>()
)

export const removeClassroomSuccess = createAction(
  '[Classroom Select Page] Remove Classroom Success'
)

export const removeClassroomFailure = createAction(
  '[Classroom Select Page] Remove Classroom Page',
  props<{ error: string }>()
)

// Classroom - LOAD

export const loadClassrooms = createAction(
  '[Classroom Select Page] Load Classroom'
)

export const loadClassroomsSuccess = createAction(
  '[Classroom Select Page] Classroom Load Success',
props<{ classrooms: any[] }>()
)

export const loadClassroomsFailure = createAction(
  '[Classroom Select Page] Classroom Load Failure',
props<{ error: string }>()
)

export const loadClassroom = createAction(
  '[Classroom View Page] Load Classroom',
  props<{classroomId:string}>()
)

// Notes - ADD / UPDATE / DELETE

export const addClassroomNote = createAction(
  '[Classroom View Page] Add Classroom Note',
  props<{_id: string, payload: any}>()
)

export const addClassroomNoteSuccess = createAction(
  '[Classroom View Page] Add Classroom Note Success'
)

export const addClassroomNoteFailure = createAction(
  '[Classroom View Page] Add Classroom Note Failure',
  props<{ error: string }>()
)

export const deleteClassroomNote = createAction(
  '[Classroom View Page] Delete Classroom Note',
  props<{_id: string, itemId: string}>()
)

export const deleteClassroomNoteSuccess = createAction(
  '[Classroom View Page] Delete Classroom Note Success'
)

export const deleteClassroomNoteFailure = createAction(
  '[Classroom View Page] Delete Classroom Note Failure',
  props<{ error: string }>()
)

// Activities - ADD / UPDATE / DELETE

export const addClassroomActivity = createAction(
  '[Classroom View Page] Add Classroom Activity',
  props<{_id: string, itemId: string, payload: any}>()
)

export const addClassroomActivitySuccess = createAction(
  '[Classroom View Page] Add Classroom Activity Success'
)

export const addClassroomActivityFailure = createAction(
  '[Classroom View Page] Add Classroom Activity Failure',
  props<{ error: string }>()
)

export const deleteClassroomActivity = createAction(
  '[Classroom View Page] Delete Classroom Activity',
  props<{_id: string, itemId: string}>()
)

export const deleteClassroomActivitySuccess = createAction(
  '[Classroom View Page] Delete Classroom Activity Success'
)

export const deleteClassroomActivityFailure = createAction(
  '[Classroom View Page] Delete Classroom Activity Failure',
  props<{ error: string }>()
)


