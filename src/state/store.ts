import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer = combineReducers({
    todolist: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootReducerType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer )

// @ts-ignore
window.store = store