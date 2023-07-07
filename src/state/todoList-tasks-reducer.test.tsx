import {tasksType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {addTodoListAC, todolistInitStateType, todoListReducer} from "./todoList-reducer";

test('todoList should be removed',() => {

    const todoLists: Array<todolistInitStateType> = []
    const tasks: tasksType = {}

    const action = addTodoListAC('newTodoList', '123')
    const newTodoLists = todoListReducer(todoLists, action)
    const newTasks = tasksReducer(tasks, action)

    const idFromTodoListReducer = newTodoLists[0].id
    const keys = Object.keys(newTasks)
    const idFromTasksReducer = keys[0]

    expect(idFromTodoListReducer).toEqual(idFromTasksReducer)
    expect(idFromTodoListReducer).toBe(action.todoListId)
    expect(idFromTasksReducer).toBe(action.todoListId)
})
