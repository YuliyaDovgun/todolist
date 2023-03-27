import {combineReducers, createStore} from "redux";
import {todoListReducer} from "./todoList-reducer";
import {tasksReducer} from "./tasks-reducer";
let rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer)
export type AppStoreType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store