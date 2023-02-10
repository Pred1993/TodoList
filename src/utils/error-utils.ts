import { setAppErrorAC, setAppStatusAC } from '../app/app-reducer';
import { ResponseType } from '../api/todolist-api';
import { Dispatch } from 'redux';
type ActionErrorType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>;
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ActionErrorType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC( {error: data.messages[0]}));
  } else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}));
  }
  dispatch(setAppStatusAC({status: "failed"}));
};
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<ActionErrorType>) => {
  dispatch(setAppErrorAC(error.message ? {error: error.message}  :{error: 'Some error occurred'}));
  dispatch(setAppStatusAC({status: "failed"}));
};
