import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})
export const todolistAPI = {
    getTodolists: () => {
        return instance.get<getTodolistRT[]>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post<todolistRT<{item: getTodolistRT}>>('todo-lists', {title})
    },
    deleteTodolist: (todolistId: string) => {
        return instance.delete<todolistRT>(`todo-lists/${todolistId}`)
    },
    updateTodolist: (todolistId: string, title: string) => {
        return instance.put<todolistRT>(`todo-lists/${todolistId}`, {title})

    }
}
type getTodolistRT = {
    id: string,
    title: string,
    addedDate: Date,
    order: number
}
type todolistRT<T = {}> = {
    data: T,
    messages: string[],
    resultCode: number
}