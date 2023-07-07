import {filterType} from "../App";
import {todolistAPI, todolistRT} from "../api/todolist-api";
import {AppThunkType} from "./store";
import {appStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleNetworkAppError, handleServerAppError} from "../utils/errors-utils";

const initState: Array<todolistInitStateType> = []

export const todoListReducer = (state = initState, action: todoListActionType): Array<todolistInitStateType> => {
    switch (action.type) {
        case ('REMOVE-TODOLIST'): {
            return state.filter(tl => tl.id !== action.id)
        }
        case ('ADD-TODOLIST'): {
            return [{
                id: action.todoListId,
                title: action.title,
                filter: "All",
                addedDate: '',
                order: 0,
                entityStatus: 'idle'
            }, ...state]
        }
        case ('CHANGE-TITLE-TODOLIST'): {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.newTitle} : tl)
        }
        case ('CHANGE-STATUS-TODOLIST'): {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.newStatus} : tl)
        }
        case ('SET-TODOLISTS'): {
            return action.todoLists.map(tl => ({...tl, filter: 'All', entityStatus: "idle"}))
        }
        case ('TODOLIST/SET-ENTITY-STATUS'): {
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state
    }

}

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST', id: todolistId
} as const)
export const addTodoListAC = (title: string, todoListId: string) => ({
    type: 'ADD-TODOLIST', title, todoListId
} as const)
export const changeTitleTodoListAC = (todoListId: string, newTitle: string) => ({
    type: 'CHANGE-TITLE-TODOLIST', id: todoListId, newTitle
} as const)
export const changeStatusTodoListAC = (todoListId: string, newStatus: filterType) => ({
    type: 'CHANGE-STATUS-TODOLIST', id: todoListId, newStatus
} as const)
export const setTodoListsAC = (todoLists: Array<todolistRT>) => ({
    type: 'SET-TODOLISTS', todoLists
} as const)
export const setTodoListEntityStatusAC = (todoListId: string, entityStatus: appStatusType) => ({
    type: 'TODOLIST/SET-ENTITY-STATUS', todoListId, entityStatus
} as const)

export const fetchTodoListsTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC('success'))
            dispatch(setTodoListsAC(res.data))
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTodoListEntityStatusAC(todolistId,'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(setTodoListEntityStatusAC(todolistId, 'success'))
                dispatch(removeTodolistAC(todolistId))
            } else {
                dispatch(setTodoListEntityStatusAC(todolistId, 'failed'))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            dispatch(setTodoListEntityStatusAC(todolistId, 'failed'))
            handleNetworkAppError(e.message, dispatch)
        })
}
export const addTodolistTC = (title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(addTodoListAC(title, res.data.data.item.id))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}
export const changeTitleTodoListTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(changeTitleTodoListAC(todoListId, title))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}

export type removeTodolistType = ReturnType<typeof removeTodolistAC>
export type addTodolistType = ReturnType<typeof addTodoListAC>
type changeTitleTodoListType = ReturnType<typeof changeTitleTodoListAC>
type changeStatusTodoListType = ReturnType<typeof changeStatusTodoListAC>
export type setTodoListsType = ReturnType<typeof setTodoListsAC>
type setTodolistStatusType = ReturnType<typeof setTodoListEntityStatusAC>

export type todoListActionType =
    removeTodolistType
    | addTodolistType
    | changeTitleTodoListType
    | changeStatusTodoListType
    | setTodoListsType
    | setTodolistStatusType

export type todolistDomainType = todolistRT & { filter: filterType }
export type todolistInitStateType = todolistDomainType & { entityStatus: appStatusType }

export type ErrorsType = {
    field: string,
    message: string,
}