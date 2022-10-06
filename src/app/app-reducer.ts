//app-reducer.tsx

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
  // происходит ли сейчас взаимодействие с сервером
  status: 'idle' as RequestStatusType,
  // если ошибка какая-то глобальная произойдёт мы запишем текст ошибки сюда
  error: null as string | null,
};

export type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status };
    case 'APP/SET-ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

type AppActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>;
export const setErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const);
export const setStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const);
