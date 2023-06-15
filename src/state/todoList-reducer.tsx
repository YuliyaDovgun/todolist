import {filterType} from "../App";
import {v1} from "uuid";
import {todolistAPI, todolistRT} from "../api/todolist-api";
import {AppThunkType} from "./store";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST'
export const ADD_TODOLIST = 'ADD-TODOLIST'
const CHANGE_TITLE_TODOLIST = 'CHANGE-TITLE-TODOLIST'
const CHANGE_STATUS_TODOLIST = 'CHANGE-STATUS-TODOLIST'
export const SET_TODOLISTS = 'SET-TODOLISTS'

export type removeTodolistType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type addTodolistType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
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
export type setTodoListsType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<todolistRT>
}

export type todoListActionType =
    removeTodolistType
    | addTodolistType
    | changeTitleTodoListType
    | changeStatusTodoListType
    | setTodoListsType

export type todolistDomainType = todolistRT & {filter: filterType}

export const todolistId1 = v1() //remove after refactoring tasks
export const todolistId2 = v1() //remove after refactoring tasks

const initState: Array<todolistDomainType> = []

export const todoListReducer = (state = initState, action: todoListActionType): Array<todolistDomainType> => {
    switch (action.type) {
        case (REMOVE_TODOLIST): {
            return state.filter(tl => tl.id !== action.id)
        }
        case (ADD_TODOLIST): {
            return [{id: action.todoListId, title: action.title, filter: "All", addedDate: '', order: 0}, ...state]
        }
        case (CHANGE_TITLE_TODOLIST): {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case (CHANGE_STATUS_TODOLIST): {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newStatus} : tl)
        }
        case (SET_TODOLISTS): {
            return action.todoLists.map(tl => ({...tl, filter: 'All'}))
        }
        default:
            return state
    }

}
export const removeTodolistAC = (todolistId: string): removeTodolistType => ({
    type: REMOVE_TODOLIST, id: todolistId
})
export const addTodoListAC = (title: string): addTodolistType => ({
    type: ADD_TODOLIST, title, todoListId: v1()
})
export const changeTitleTodoListAC = (todoListId: string, newTitle: string): changeTitleTodoListType => ({
    type: CHANGE_TITLE_TODOLIST, id: todoListId, newTitle
})
export const changeStatusTodoListAC = (todoListId: string, newStatus: filterType): changeStatusTodoListType => ({
    type: CHANGE_STATUS_TODOLIST, id: todoListId, newStatus
})
export const setTodoListsAC = (todoLists: Array<todolistRT>): setTodoListsType => ({
    type: SET_TODOLISTS, todoLists
})
export const fetchTodoListsTC = (): AppThunkType => {
    return (dispatch) => {
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}