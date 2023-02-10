import { Dispatch } from 'redux';
import { authAPI } from '../api/todolist-api';
import { setIsLoggedInAC } from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
      state.error = action.payload.error
    },
    setAppIsInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
      state.isInitialized = action.payload.isInitialized
    },
  }
})

export const appReducer = slice.reducer

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = typeof initialState;
// action
export const {setAppErrorAC, setAppIsInitializedAC, setAppStatusAC} = slice.actions

// thunk
export const isInitializedAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}));
    }
  }).finally(() => {
    dispatch(setAppIsInitializedAC({isInitialized: true}));
  });
};
