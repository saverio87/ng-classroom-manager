import { createReducer, on } from '@ngrx/store';
import { login,loginFailure,loginSuccess,signup,signupFailure,signupSuccess, userLoaded, authError, logout } from './auth.actions';

import { resetAllStates } from '../index';


export interface AuthState {
  xAccessToken: any,
  xRefreshToken: string | undefined,
  isAuthenticated: boolean,
  status: 'pending' | 'loading' | 'error' | 'success';
  user: any | null,
}

// localStorage.getItem('x-access-token')
// localStorage.getItem('x-refresh-token')

export const initialState: AuthState = {
  xAccessToken: '',
  xRefreshToken: '',
  isAuthenticated: false,
  status: 'pending',
  user: null,
}


export const authReducer = createReducer(
  initialState, 

  // Reset State

  on(resetAllStates, (state) => ({
    ...initialState
  })),

  // Login

  on(login, (state) => ({
    ...state,
    status: 'loading',
  })),

  on(loginSuccess, (state, { _id, tokens }) => ({
    ...state,
    user: _id,
    xAccessToken: tokens.xAccessToken,
    xRefreshToken: tokens.xRefreshToken,
    status: 'success'
  })),

  // on(loginFailure, (state, { classroomId }) => ({
  //   ...state,
  //   current: state.classrooms.filter(
  //     (classroom) => {return classroom._id === classroomId}
  //   )[0]
  // })),


)


