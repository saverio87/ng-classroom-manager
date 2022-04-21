import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { studentReducer } from "./students/students.reducer";
import { classroomReducer } from "./classrooms/classrooms.reducer";
import { hydrationMetaReducer } from "./hydration/hydration.reducer";
import { AppState } from "../app.state";
import { authReducer } from "./auth/auth.reducer";

import {createAction} from '@ngrx/store';

// Reset all states

export const resetAllStates = createAction(
  '[Anywhere] Reset All States'
)

export const reducers: ActionReducerMap<AppState> = {
  students: studentReducer,
  classrooms: classroomReducer,
  auth: authReducer
}

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]




