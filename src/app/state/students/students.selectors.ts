

import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { StudentState } from "./students.reducer";

export const selectStudents = (state:AppState) => state.students


export const selectAllStudents = createSelector(selectStudents, (state:StudentState)=> state.students);

export const selectCurrentStudent = createSelector(selectStudents, (state:StudentState)=> state.current);

export const selectCurrentClassroomStudents = createSelector(selectStudents, (state:StudentState)=> state.studentsInCurrentClass);

export const selectStatus = createSelector(
  selectStudents, (state:StudentState) => state.status
)