import { Dispatch } from 'redux';
import { authAPI, LoginParamsType, StatusCode } from '../../api/todolist-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{isLoggedIn: boolean}>) {
      state.isLoggedIn = action.payload.isLoggedIn
    }
  }
})


export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AuthActionType>) => {
  dispatch(setAppStatusAC({status: 'loading'}));
  authAPI
    .login(data)
    .then((response) => {
      if (response.data.resultCode === StatusCode.Ok) {
        dispatch(setIsLoggedInAC({isLoggedIn:true}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn:true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// type
export type AuthActionType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setAppStatusAC>;
export type initialStateType = typeof initialState;