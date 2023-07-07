import {instance} from "./instance";

export const todolistAPI = {
    getTodolists: () => {
        return instance.get<todolistRT[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<todolistsRT<{item: todolistRT}>>('todo-lists', {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<todolistsRT>(`todo-lists/${todolistId}`)
    },
    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<todolistsRT<{item: todolistRT}>>(`todo-lists/${todolistId}`, {title})

    }
}
export type todolistRT = {
    id: string,
    title: string,
    addedDate: Date | string,
    order: number
}
export type todolistsRT<T = {}> = {
    data: T,
    messages: string[],
    resultCode: number
}