import {tasksType} from "../App";
import {v1} from "uuid";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TITLE_TASK = 'CHANGE-TITLE-TASK'
const CHANGE_STATUS_TASK = 'CHANGE-STATUS-TASK'

type removeTaskType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}
type addTaskType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}
type changeTitleTaskType = {
    type: 'CHANGE-TITLE-TASK'
    taskId: string
    newTitle: string
    todoListId: string
}
type changeStatusTaskType = {
    type: 'CHANGE-STATUS-TASK'
    taskId: string
    newStatus: boolean
    todoListId: string
}

type actionType = removeTaskType | addTaskType | changeTitleTaskType | changeStatusTaskType

export const tasksReducer = (state: tasksType, action: actionType): tasksType => {
    switch (action.type) {
        case (REMOVE_TASK): {
            return {...state, [action.todoListId] : state[action.todoListId].filter(t => t.id !== action.taskId)}
        }
        case (ADD_TASK): {
            return { ...state, [action.todoListId] : [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]}
        }
        case (CHANGE_STATUS_TASK): {
            return { ...state, [action.todoListId] : state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.newStatus} : t)}
        }
        case (CHANGE_TITLE_TASK): {
            return { ...state, [action.todoListId] : state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)}
        }
        default:
            return state
    }

}
export const removeTaskAC = (taskId: string, todoListId: string): removeTaskType => ({
    type: REMOVE_TASK , taskId, todoListId
})
export const addTaskAC = (title: string, todoListId: string): addTaskType => ({
    type: ADD_TASK, title, todoListId
})
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): changeTitleTaskType => ({
    type: CHANGE_TITLE_TASK, taskId, newTitle, todoListId
})
export const changeTaskStatusAC = (taskId: string, newStatus: boolean, todoListId: string): changeStatusTaskType => ({
    type: CHANGE_STATUS_TASK, taskId, newStatus, todoListId
})