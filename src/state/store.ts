import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListActionType, todoListReducer} from "./todoList-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";

let rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStoreType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type AppActionType = todoListActionType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AppActionType>
//@ts-ignore
window.store = store