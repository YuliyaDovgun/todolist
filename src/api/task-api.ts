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
    updateTask: (todolistId: string, taskId: string, title: string) => {
        return instance.put<tasksRT<{item: taskRT}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})

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
type taskRT = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: Date,
    deadline: Date,
    id: string,
    todoListId: string,
    order: number
    addedDate: Date,
}