
import {createAction,props} from '@ngrx/store';

// 

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string, password: string }>()
)

// Probably don't need loginSuccess and loginFailure

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ _id: string, tokens: any }>()
  // We get back the user id and the x-access-token + x-refresh token
)

export const loginFailure = createAction(
  '[Login Page] Login Failure',
  props<{ error: string }>()
)

export const userLoaded = createAction(
  '[Dashboard Page] User Loaded',
  props<{ user: any[] }>()
)

export const authError = createAction(
  '[Login Page] Auth Error',
  props<{ error: string }>()
)

export const signup = createAction(
  '[Signup Page] Signup'
)

export const signupSuccess = createAction(
  '[Signup Page] Signup Success',
  props<{ user: any[] }>()
)

export const signupFailure = createAction(
  '[Signup Page] Signup Failure',
  props<{ error: string }>()
)

export const logout = createAction(
  '[Navbar Component] Logout'
)



