
import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { ClassroomState } from "./classrooms.reducer";

export const selectClassrooms = (state:AppState) => state.classrooms

// export const selectStudents =
// (state:AppState) => state.students

export const selectAllClassrooms = createSelector(selectClassrooms, (state:ClassroomState)=> state.classrooms);

export const selectCurrentClassroom = createSelector(selectClassrooms,
  (state:ClassroomState)=> state.current)