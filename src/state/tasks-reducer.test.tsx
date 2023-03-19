import {tasksType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodoListAC, removeTodolistAC} from "./todoList-reducer";

let tasks: tasksType
beforeEach(() => {
    tasks =  {
        'todolistId1': [
            {id: '1', title: 'Milk', isDone: false},
            {id: '2', title: 'Beer', isDone: true},
            {id: '3', title: 'Fish', isDone: true},
        ],
        'todolistId2': [
            {id: '1', title: 'JS', isDone: false},
            {id: '2', title: 'English', isDone: true},
        ],
    }
})
test('task should be removed',() => {

    const newTodoLists = tasksReducer(tasks, removeTaskAC('1', 'todolistId1'))

    expect(tasks['todolistId1'].length).toBe(3)
    expect(newTodoLists['todolistId1'].length).toBe(2)
    expect(newTodoLists['todolistId1'][0].id).toBe('2')
    expect(newTodoLists['todolistId1'][0].title).toBe('Beer')
})
test('task should be added',() => {

    const newTodoLists = tasksReducer(tasks, addTaskAC('newTask', 'todolistId1'))

    expect(tasks['todolistId1'].length).toBe(3)
    expect(newTodoLists['todolistId1'].length).toBe(4)
    expect(newTodoLists['todolistId1'][0].id).toBeDefined()
    expect(newTodoLists['todolistId1'][0].title).toBe('newTask')
    expect(newTodoLists['todolistId1'][0].isDone).toBe(false)
})
test('task status should be changed',() => {

    const newTasks = tasksReducer(tasks, changeTaskStatusAC('2', false, 'todolistId2'))

    expect(tasks['todolistId2'].length).toBe(2)
    expect(newTasks['todolistId1'][1].isDone).toBe(true)
    expect(newTasks['todolistId2'][1].isDone).toBe(false)
})
test('task title should be changed',() => {

    const newTodoLists = tasksReducer(tasks, changeTaskTitleAC('2', 'changedTitle', 'todolistId2'))

    expect(tasks['todolistId2'].length).toBe(2)
    expect(tasks['todolistId2'][1].title).toBe('English')
    expect(newTodoLists['todolistId2'][1].title).toBe('changedTitle')
})
test('empty task array should be added when todoList added',() => {

    const newTasks = tasksReducer(tasks, addTodoListAC('new todolist'))

    const keys = Object.keys(newTasks)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(newTasks[newKey]).toEqual([])
})
test('task array should be removed when todoList removed',() => {

    const newTasks = tasksReducer(tasks, removeTodolistAC('todolistId1'))

    const keys = Object.keys(newTasks)

    expect(keys.length).toBe(1)
    expect(newTasks['todolistId1']).toBeUndefined()
})