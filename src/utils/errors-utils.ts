import {setAppErrorAC, setAppErrorAT, setAppStatusAC, setAppStatusAT} from "../state/app-reducer";
import {Dispatch} from "redux";
import {todolistsRT} from "../api/todolist-api";
import {tasksRT} from "../api/task-api";

export const handleServerAppError = <T>(data: todolistsRT<T> | tasksRT<T>, dispatch: ErrorDispatchActionsType) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'Some error occurred. Try later...'))
}
export const handleNetworkAppError = (errorMessage: string, dispatch: ErrorDispatchActionsType) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(errorMessage))
}

type ErrorDispatchActionsType = Dispatch<setAppStatusAT | setAppErrorAT>