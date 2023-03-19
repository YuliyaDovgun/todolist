import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TITLE_TODOLIST = 'CHANGE-TITLE-TODOLIST'
const CHANGE_STATUS_TODOLIST = 'CHANGE-STATUS-TODOLIST'

type removeTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type addTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
}
type changeTitleTodoListType = {
    type: 'CHANGE-TITLE-TODOLIST'
    id: string
    newTitle: string
}
type changeStatusTodoListType = {
    type: 'CHANGE-STATUS-TODOLIST'
    id: string
    newStatus: filterType
}

type actionType = removeTodolistType | addTodolistType | changeTitleTodoListType | changeStatusTodoListType

export const todoListReducer = (state: Array<TodolistType>, action: actionType): Array<TodolistType> => {
    switch (action.type) {
        case (REMOVE_TODOLIST): {
            return state.filter(tl => tl.id !== action.id)
        }
        case (ADD_TODOLIST): {
            return [{id: v1(), title: action.title, filter: "All"}, ...state]
        }
        case (CHANGE_TITLE_TODOLIST): {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case (CHANGE_STATUS_TODOLIST): {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newStatus} : tl)
        }
        default:
            return state
    }

}
export const removeTodolistAC = (todolistId: string): removeTodolistType => ({
    type: REMOVE_TODOLIST , id: todolistId
})
export const addTodoListAC = (title: string): addTodolistType => ({
    type: ADD_TODOLIST, title
})
export const changeTitleTodoListAC = (todoListId: string, newTitle: string): changeTitleTodoListType => ({
    type: CHANGE_TITLE_TODOLIST, id: todoListId, newTitle
})
export const changeStatusTodoListAC = (todoListId: string, newStatus: filterType): changeStatusTodoListType => ({
    type: CHANGE_STATUS_TODOLIST, id: todoListId, newStatus
})