import {filterType} from "../App";
import {todolistAPI, todolistRT} from "../api/todolist-api";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./app-reducer";

const initState: Array<todolistDomainType> = []

export const todoListReducer = (state = initState, action: todoListActionType): Array<todolistDomainType> => {
    switch (action.type) {
        case ('REMOVE-TODOLIST'): {
            return state.filter(tl => tl.id !== action.id)
        }
        case ('ADD-TODOLIST'): {
            return [{id: action.todoListId, title: action.title, filter: "All", addedDate: '', order: 0}, ...state]
        }
        case ('CHANGE-TITLE-TODOLIST'): {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case ('CHANGE-STATUS-TODOLIST'): {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newStatus} : tl)
        }
        case ('SET-TODOLISTS'): {
            return action.todoLists.map(tl => ({...tl, filter: 'All'}))
        }
        default:
            return state
    }

}

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', id: todolistId
}as const)
export const addTodoListAC = (title: string, todoListId: string) => ({
    type: 'ADD-TODOLIST', title, todoListId
}as const)
export const changeTitleTodoListAC = (todoListId: string, newTitle: string) => ({
    type: 'CHANGE-TITLE-TODOLIST', id: todoListId, newTitle
}as const)
export const changeStatusTodoListAC = (todoListId: string, newStatus: filterType) => ({
    type: 'CHANGE-STATUS-TODOLIST', id: todoListId, newStatus
}as const)
export const setTodoListsAC = (todoLists: Array<todolistRT>) => ({
    type: 'SET-TODOLISTS', todoLists
}as const)

export const fetchTodoListsTC = (): AppThunkType => (dispatch) =>  {
    dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                dispatch(setAppStatusAC('success'))
                dispatch(setTodoListsAC(res.data))
            })
}
export const removeTodolistTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(setAppStatusAC('success'))
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(setAppStatusAC('success'))
            dispatch(addTodoListAC(title, res.data.data.item.id))
        })
}
export const changeTitleTodoListTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todoListId, title)
        .then(res => {
            dispatch(setAppStatusAC('success'))
            dispatch(changeTitleTodoListAC(todoListId, title))
        })
}

export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type addTodolistType = ReturnType<typeof addTodoListAC>
type changeTitleTodoListType = ReturnType<typeof changeTitleTodoListAC>
type changeStatusTodoListType = ReturnType<typeof changeStatusTodoListAC>
export type setTodoListsType = ReturnType<typeof setTodoListsAC>

export type todoListActionType =
    removeTodolistType
    | addTodolistType
    | changeTitleTodoListType
    | changeStatusTodoListType
    | setTodoListsType

export type todolistDomainType = todolistRT & {filter: filterType}