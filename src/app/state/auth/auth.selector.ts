
import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { AuthState } from "./auth.reducer";

export const selectAuthState = (state:AppState) => state.auth


export const currentAccessToken = createSelector(
  selectAuthState,
  (state:AuthState) => state.xAccessToken
);

export const currentRefreshToken = createSelector(
  selectAuthState,
  (state:AuthState) => state.xRefreshToken
);