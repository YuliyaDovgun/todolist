import {instance} from "./instance";

export const taskAPI = {
    getTasks: (todolistId: string) => {
        return instance.get<getTasksRT>(`todo-lists/${todolistId}/tasks`)
    },
    createTask: (todolistId: string, title: string) => {
        return instance.post<tasksRT<{item: taskRT}>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return instance.delete<tasksRT>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask: (todolistId: string, taskId: string, model: taskRTUpdateType) => {
        return instance.put<tasksRT<{item: taskRT}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)

    }
}
type getTasksRT = {
    items: taskRT[],
    totalCount: number,
    error: string
}
type tasksRT<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
}
export type taskRT = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: Date | string,
    deadline: Date | string,
    id: string,
    todoListId: string,
    order: number
    addedDate: Date | string,
}
export type taskRTUpdateType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: Date | string,
    deadline: Date | string,
}
export enum TaskStatuses {
    New,
    InProgress ,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}