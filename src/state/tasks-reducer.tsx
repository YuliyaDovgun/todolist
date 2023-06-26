import {tasksType} from "../App";
import {v1} from "uuid";
import {
    ADD_TODOLIST,
    addTodolistType,
    REMOVE_TODOLIST,
    removeTodolistType,
    SET_TODOLISTS,
    setTodoListsType,
} from "./todoList-reducer";
import {taskAPI, taskRT} from "../api/task-api";
import {AppThunkType} from "./store";

const REMOVE_TASK = 'REMOVE-TASK'
const ADD_TASK = 'ADD-TASK'
const CHANGE_TITLE_TASK = 'CHANGE-TITLE-TASK'
const CHANGE_STATUS_TASK = 'CHANGE-STATUS-TASK'
const SET_TASKS = 'SET-TASKS'

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
    newStatus: number
    todoListId: string
}
type setTasksType = {
    type: 'SET-TASKS'
    todoListId: string
    tasks: taskRT[]
}

export type tasksActionType = removeTaskType | addTaskType | changeTitleTaskType | changeStatusTaskType
    | addTodolistType | removeTodolistType | setTodoListsType | setTasksType

const initState: tasksType = {}

export const tasksReducer = (state= initState, action: tasksActionType): tasksType => {
    switch (action.type) {
        case (REMOVE_TASK): {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        }
        case (ADD_TASK): {
            return {
                ...state,
                [action.todoListId]: [{id: v1(), title: action.title, status: 0,  description: '',
                    completed: false, priority: 0, startDate: '', deadline: '',
                    todoListId: action.todoListId, order: 0, addedDate: '',}, ...state[action.todoListId]]
            }
        }
        case (CHANGE_STATUS_TASK): {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.newStatus
                } : t)
            }
        }
        case (CHANGE_TITLE_TASK): {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        }
        case (ADD_TODOLIST) : {
            return {...state, [action.todoListId]: []}
        }
        case (REMOVE_TODOLIST) : {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        case (SET_TODOLISTS) : {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case (SET_TASKS): {
            return {...state, [action.todoListId]: [...action.tasks, ...state[action.todoListId]] }
        }
        default:
            return state
    }

}
export const removeTaskAC = (taskId: string, todoListId: string): removeTaskType => ({
    type: REMOVE_TASK, taskId, todoListId
})
export const addTaskAC = (title: string, todoListId: string): addTaskType => ({
    type: ADD_TASK, title, todoListId
})
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string): changeTitleTaskType => ({
    type: CHANGE_TITLE_TASK, taskId, newTitle, todoListId
})
export const changeTaskStatusAC = (taskId: string, newStatus: number, todoListId: string): changeStatusTaskType => ({
    type: CHANGE_STATUS_TASK, taskId, newStatus, todoListId
})
export const setTasksAC = (todoListId: string, tasks: taskRT[]): setTasksType => ({
    type: SET_TASKS, todoListId, tasks
})
export const fetchTasksTC = (todoListId: string): AppThunkType => {
    return (dispatch) => {
        taskAPI.getTasks(todoListId)
            .then(res =>
               dispatch(setTasksAC(todoListId, res.data.items)))
    }
}