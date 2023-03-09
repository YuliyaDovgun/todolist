import {v1} from "uuid";
import {filterType, TodolistType} from "../App";
import {
    addTodoListAC,
    changeStatusTodoListAC,
    changeTitleTodoListAC,
    removeTodolistAC,
    todoListReducer
} from "./todoList-reducer";

let todolists: Array<TodolistType>

const todolistId1 = v1()
const todolistId2 = v1()

beforeEach(() => {
    todolists = [
        {id: todolistId1, title: 'What to do', filter: 'All',},
        {id: todolistId2, title: 'What to learn', filter: 'All'},
    ]
})
test('todoList should be removed',() => {

    const newTodoLists = todoListReducer(todolists, removeTodolistAC(todolistId1))

    expect(todolists.length).toBe(2)
    expect(newTodoLists.length).toBe(1)
    expect(newTodoLists[0].title).toBe('What to learn')
})
test('todoList should be added',() => {

    const title: string = 'New todoList'

    const newTodoLists = todoListReducer(todolists, addTodoListAC(title))

    expect(todolists.length).toBe(2)
    expect(newTodoLists.length).toBe(3)
    expect(newTodoLists[0].title).toBe('New todoList')
})
test('todoList title should be changed',() => {

    const newTitle = 'Changed title'

    const newTodoLists = todoListReducer(todolists, changeTitleTodoListAC(todolistId1, newTitle))

    expect(todolists.length).toBe(2)
    expect(todolists[0].title).toBe('What to do')

    expect(newTodoLists.length).toBe(2)
    expect(newTodoLists[0].title).toBe('Changed title')
})
test('todoList status should be changed',() => {

    const newStatus: filterType = 'Completed'

    const newTodoLists = todoListReducer(todolists, changeStatusTodoListAC(todolistId1, newStatus))

    expect(todolists.length).toBe(2)
    expect(todolists[0].filter).toBe('All')

    expect(newTodoLists.length).toBe(2)
    expect(newTodoLists[0].filter).toBe('Completed')
})