import { Dispatch } from 'redux';
import { authAPI } from '../api/todolist-api';
import { setIsLoggedInAC } from '../features/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

export type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    case 'APP/SET-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};
//types
export type AppActionsType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppIsInitializedAC>
  | ReturnType<typeof setIsLoggedInAC>;

// action
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);

export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);

export const setAppIsInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', isInitialized } as const);

// thunk
export const isInitializedAppTC = () => (dispatch: Dispatch<AppActionsType>) => {
  debugger
  authAPI.me().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}));
    }
  }).finally(() => {
    dispatch(setAppIsInitializedAC(true));
  });
};
