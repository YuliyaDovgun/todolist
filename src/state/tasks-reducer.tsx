import {tasksType} from "../App";
import {addTodolistType, ErrorsType, removeTodolistType, setTodoListsType,} from "./todoList-reducer";
import {taskAPI, taskRT} from "../api/task-api";
import {AppThunkType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleNetworkAppError, handleServerAppError} from "../utils/errors-utils";

const initState: tasksType = {}

export const tasksReducer = (state = initState, action: tasksActionType): tasksType => {
    switch (action.type) {
        case ('REMOVE-TASK'): {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        }
        case ('ADD-TASK'): {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)
            }
        }
        case ('ADD-TODOLIST') : {
            return {...state, [action.todoListId]: []}
        }
        case ('REMOVE-TODOLIST') : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case ('SET-TODOLISTS') : {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case ('SET-TASKS'): {
            return {...state, [action.todoListId]: [...action.tasks, ...state[action.todoListId]]}
        }
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId: string) => ({
    type: 'REMOVE-TASK', taskId, todoListId
} as const)
export const addTaskAC = (task: taskRT) => ({
    type: 'ADD-TASK', task
} as const)
export const updateTaskAC = (taskId: string, domainModel: domainTaskRTUpdateType, todoListId: string) => ({
    type: 'UPDATE-TASK', taskId, domainModel, todoListId
} as const)
export const setTasksAC = (todoListId: string, tasks: taskRT[]) => ({
    type: 'SET-TASKS', todoListId, tasks
} as const)

export const fetchTasksTC = (todoListId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.getTasks(todoListId)
        .then(res => {
            dispatch(setAppStatusAC('success'))
            dispatch(setTasksAC(todoListId, res.data.items))
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}
export const removeTackTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(removeTaskAC(taskId, todoListId))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}
export const addTackTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.createTask(todoListId, title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setAppStatusAC('success'))
                dispatch(addTaskAC(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError<ErrorsType>) => {
            handleNetworkAppError(e.message, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: domainTaskRTUpdateType): AppThunkType => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const apiModel = getState().tasks[todolistId].find(t => t.id === taskId)
    if (apiModel) {
        taskAPI.updateTask(todolistId, taskId, {
            deadline: apiModel.deadline,
            title: apiModel.title,
            status: apiModel.status,
            description: apiModel.description,
            priority: apiModel.priority,
            startDate: apiModel.startDate,
            completed: apiModel.completed,
            ...domainModel
        })
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('success'))
                    dispatch(updateTaskAC(taskId, res.data.data.item, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((e: AxiosError<ErrorsType>) => {
                handleNetworkAppError(e.message, dispatch)
            })
    }

}

type removeTaskType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type setTasksType = ReturnType<typeof setTasksAC>
type updateTaskType = ReturnType<typeof updateTaskAC>

export type tasksActionType = removeTaskType
    | addTaskType
    | updateTaskType
    | addTodolistType
    | removeTodolistType
    | setTodoListsType
    | setTasksType

export type domainTaskRTUpdateType = {
    description?: string,
    title?: string,
    completed?: boolean,
    status?: number,
    priority?: number,
    startDate?: Date | string,
    deadline?: Date | string,
}