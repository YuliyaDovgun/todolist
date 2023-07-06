import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListActionType, todoListReducer} from "./todoList-reducer";
import {tasksActionType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appActionType, appReducer} from "./app-reducer";

let rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export type AppActionType = todoListActionType | tasksActionType | appActionType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionType>


//@ts-ignore
window.store = store