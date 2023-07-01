import {tasksType} from "../App";
import {v1} from "uuid";
import {
    addTodolistType,
    removeTodolistType,
    setTodoListsType,
} from "./todoList-reducer";
import {taskAPI, taskRT} from "../api/task-api";
import {AppThunkType} from "./store";

const initState: tasksType = {}

export const tasksReducer = (state = initState, action: tasksActionType): tasksType => {
    switch (action.type) {
        case ('REMOVE-TASK'): {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        }
        case ('ADD-TASK'): {
            return {
                ...state,
                [action.todoListId]: [{
                    id: v1(), title: action.title, status: 0, description: '',
                    completed: false, priority: 0, startDate: '', deadline: '',
                    todoListId: action.todoListId, order: 0, addedDate: '',
                }, ...state[action.todoListId]]
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
}as const)
export const addTaskAC = (title: string, todoListId: string) => ({
    type: 'ADD-TASK', title, todoListId
}as const)
export const updateTaskAC = (taskId: string, domainModel: domainTaskRTUpdateType, todoListId: string) => ({
    type: 'UPDATE-TASK', taskId, domainModel, todoListId
}as const)
export const setTasksAC = (todoListId: string, tasks: taskRT[]) => ({
    type: 'SET-TASKS', todoListId, tasks
}as const)

export const fetchTasksTC = (todoListId: string): AppThunkType => (dispatch) => {
        taskAPI.getTasks(todoListId)
            .then(res =>
                dispatch(setTasksAC(todoListId, res.data.items)))
}
export const removeTackTC = (todoListId: string, taskId: string): AppThunkType => (dispatch) => {
    taskAPI.deleteTask(todoListId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todoListId)))
}
export const addTackTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    taskAPI.createTask(todoListId, title)
        .then(res => dispatch(addTaskAC(title, todoListId)))
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: domainTaskRTUpdateType): AppThunkType => (dispatch, getState) => {
    const apiModel = getState().tasks[todolistId].find(t => t.id === taskId)
    if (apiModel){
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
            .then(res => dispatch(updateTaskAC(taskId, res.data.data.item, todolistId)))
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