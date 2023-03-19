import {tasksType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

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

    const newTodoLists = tasksReducer(tasks, changeTaskStatusAC('2', false, 'todolistId2'))

    expect(tasks['todolistId2'].length).toBe(2)
    expect(newTodoLists['todolistId1'][1].isDone).toBe(true)
    expect(newTodoLists['todolistId2'][1].isDone).toBe(false)
})
test('task title should be changed',() => {

    const newTodoLists = tasksReducer(tasks, changeTaskTitleAC('2', 'changedTitle', 'todolistId2'))

    expect(tasks['todolistId2'].length).toBe(2)
    expect(tasks['todolistId2'][1].title).toBe('English')
    expect(newTodoLists['todolistId2'][1].title).toBe('changedTitle')
})