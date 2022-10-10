import { appReducer, InitialStateType, setAppErrorAC, setAppIsInitializedAC, setAppStatusAC } from './app-reducer';

let startState: InitialStateType;
beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false,
  };
});

test('correct error should be set', () => {
  const endState = appReducer(startState, setAppErrorAC('some error'));
  expect(endState.error).toBe('some error');
});

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatusAC('loading'));
  expect(endState.status).toBe('loading');
});

test('property isInitialized should be change', () => {
  const endState = appReducer(startState, setAppIsInitializedAC(true));
  expect(endState.isInitialized).toBe(true);
});
