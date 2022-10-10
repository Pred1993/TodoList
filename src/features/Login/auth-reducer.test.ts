import {authReducer, initialStateType, setIsLoggedInAC} from "./auth-reducer";

let startState: initialStateType;
beforeEach(() => {
    startState = {
        isLoggedIn: false
    };
});

test('property isLoggedIn should be change', () => {
    const endState = authReducer(startState, setIsLoggedInAC(true));
    expect(endState.isLoggedIn).toBe(true);
});
