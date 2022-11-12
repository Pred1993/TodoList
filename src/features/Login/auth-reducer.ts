import { Dispatch } from 'redux';
import { authAPI, LoginParamsType, StatusCode } from '../../api/todolist-api';
import { setAppStatusAC } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

const initialState = {
  isLoggedIn: false, // значение для Navigate(залогинены мы или нет)
};
export type initialStateType = typeof initialState;
export const authReducer = (state: initialStateType = initialState, action: AuthActionType) => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.isLoggedIn };
    default:
      return state;
  }
};

// action
export const setIsLoggedInAC = (isLoggedIn: boolean) =>
  ({
    type: 'login/SET-IS-LOGGED-IN',
    isLoggedIn,
  } as const);

// thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<AuthActionType>) => {
  dispatch(setAppStatusAC('loading'));
  authAPI
    .login(data)
    .then((response) => {
      if (response.data.resultCode === StatusCode.Ok) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const logoutTC = () => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
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
