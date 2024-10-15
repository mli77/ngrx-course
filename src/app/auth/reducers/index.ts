import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState = {
  user: undefined
}

// export const reducers: ActionReducerMap<AuthState> = {

// };

export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
    console.log('Calling loging reducer');
      //debugger;
      return {
          user: action.user
      }
  }),

  on(AuthActions.logout, (state, action) => {
      return {
          user: undefined
      }
  })



);