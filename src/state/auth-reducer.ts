import {AppThunkType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {authAPI, loginParamsType} from "../api/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../utils/errors-utils";
import {AxiosError} from "axios";
import {ErrorsType} from "./todoList-reducer";

const initStateType = {
    isAuth: false,
    isLoggedIn: false,
}

export const authReducer = (state: authStateType = initStateType, action: authActionType): authStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-AUTH':
            return {...state, isAuth: action.isAuth}
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

export const setIsAuthAC = (isAuth: boolean) => ({type: 'AUTH/SET-IS-AUTH', isAuth} as const)
export const isLoggedInAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)

export const fetchIsAuthTC = (): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.authMe()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(setIsAuthAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}
export const isLoggedInTC = (values: loginParamsType): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login({...values})
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(isLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}


export type authStateType = typeof initStateType

export type setIsAuthAT = ReturnType<typeof setIsAuthAC>
export type isLoggedInAT = ReturnType<typeof isLoggedInAC>
export type authActionType =
    setIsAuthAT
    | isLoggedInAT