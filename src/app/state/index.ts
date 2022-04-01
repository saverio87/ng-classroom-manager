import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { studentReducer } from "./students/students.reducer";
import { classroomReducer } from "./classrooms/classrooms.reducer";
import { hydrationMetaReducer } from "./hydration/hydration.reducer";
import { AppState } from "../app.state";

export const reducers: ActionReducerMap<AppState> = {
  students: studentReducer,
  classrooms: classroomReducer
}

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

