import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

type actionsType = 'REMOVE-TODOLIST' | 'ADD-TODOLIST' | 'CHANGE-TITLE-TODOLIST' | 'CHANGE-STATUS-TODOLIST'

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
        case ('REMOVE-TODOLIST'): {
            return state.filter(tl => tl.id !== action.id)
        }
        case ('ADD-TODOLIST'): {
            return [{id: v1(), title: action.title, filter: "All"}, ...state]
        }
        case ('CHANGE-TITLE-TODOLIST'): {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case ('CHANGE-STATUS-TODOLIST'): {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newStatus} : tl)
        }
        default:
            return state
    }

}
export const removeTodolistAC = (todolistId: string): removeTodolistType => ({
    type: 'REMOVE-TODOLIST' as const, id: todolistId
})
export const addTodoListAC = (title: string): addTodolistType => ({
    type: 'ADD-TODOLIST' as const, title
})
export const changeTitleTodoListAC = (todoListId: string, newTitle: string): changeTitleTodoListType => ({
    type: 'CHANGE-TITLE-TODOLIST' as const, id: todoListId, newTitle
})
export const changeStatusTodoListAC = (todoListId: string, newStatus: filterType): changeStatusTodoListType => ({
    type: 'CHANGE-STATUS-TODOLIST' as const, id: todoListId, newStatus
})