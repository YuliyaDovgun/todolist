import {
    addTaskAC,
    removeTaskAC, setTaskEntityStatusAC,
    setTasksAC,
    tasksReducer, tasksType, updateTaskAC
} from "./tasks-reducer";
import {
    addTodoListAC,
    removeTodolistAC,
    setTodoListsAC,
    todolistDomainType,
} from "./todoList-reducer";
import {TaskStatuses} from "../api/task-api";
import {appStatusType} from "./app-reducer";

let tasks: tasksType
let todoLists: Array<todolistDomainType>

beforeEach(() => {
    tasks = {
        'todolistId1': [
            {
                id: '1', title: 'Milk', status: TaskStatuses.InProgress, description: '',
                completed: false, priority: 0, startDate: '', deadline: '',
                todoListId: 'todolistId1', order: 0, addedDate: '', entityStatus: "idle",
            },
            {
                id: '2', title: 'Beer', status: TaskStatuses.InProgress, description: '',
                completed: false, priority: 0, startDate: '', deadline: '',
                todoListId: 'todolistId1', order: 0, addedDate: '', entityStatus: "idle",
            },
            {
                id: '3', title: 'Fish', status: TaskStatuses.InProgress, description: '',
                completed: false, priority: 0, startDate: '', deadline: '',
                todoListId: 'todolistId1', order: 0, addedDate: '', entityStatus: "idle",
            },
        ],
        'todolistId2': [
            {
                id: '1', title: 'JS', status: TaskStatuses.InProgress, description: '',
                completed: false, priority: 0, startDate: '', deadline: '',
                todoListId: 'todolistId2', order: 0, addedDate: '', entityStatus: "idle",
            },
            {
                id: '2', title: 'English', status: TaskStatuses.InProgress, description: '',
                completed: false, priority: 0, startDate: '', deadline: '',
                todoListId: 'todolistId2', order: 0, addedDate: '', entityStatus: "idle",
            },
        ],
    }
    todoLists = [
        {id: 'todolistId3', title: 'What to do', addedDate: '', order: 0, filter: 'All', entityStatus: "idle"},
        {id: 'todolistId4', title: 'What to learn', addedDate: '', order: 0, filter: 'All', entityStatus: "idle"},
    ]
})
test('task should be removed', () => {

    const newTodoLists = tasksReducer(tasks, removeTaskAC('1', 'todolistId1'))

    expect(tasks['todolistId1'].length).toBe(3)
    expect(newTodoLists['todolistId1'].length).toBe(2)
    expect(newTodoLists['todolistId1'][0].id).toBe('2')
    expect(newTodoLists['todolistId1'][0].title).toBe('Beer')
})
test('task should be added', () => {
    const newTask = {
        id: '4', title: 'newTask', status: TaskStatuses.New, description: '',
        completed: false, priority: 0, startDate: '', deadline: '',
        todoListId: 'todolistId1', order: 0, addedDate: '', entityStatus: "idle",
    }

    const newTodoLists = tasksReducer(tasks, addTaskAC(newTask))

    expect(tasks['todolistId1'].length).toBe(3)
    expect(newTodoLists['todolistId1'].length).toBe(4)
    expect(newTodoLists['todolistId1'][0].id).toBe('4')
    expect(newTodoLists['todolistId1'][0].title).toBe('newTask')
    expect(newTodoLists['todolistId1'][0].status).toBe(0)
})
test('task status should be changed', () => {

    const newTasks = tasksReducer(tasks, updateTaskAC('2', {status: TaskStatuses.Completed}, 'todolistId2'))

    expect(tasks['todolistId2'].length).toBe(2)
    expect(newTasks['todolistId1'][1].status).toBe(TaskStatuses.InProgress)
    expect(newTasks['todolistId2'][1].status).toBe(TaskStatuses.Completed)
})
test('task title should be changed', () => {

    const newTodoLists = tasksReducer(tasks, updateTaskAC('2', {title: 'changedTitle'}, 'todolistId2'))

    expect(tasks['todolistId2'].length).toBe(2)
    expect(tasks['todolistId2'][1].title).toBe('English')
    expect(newTodoLists['todolistId2'][1].title).toBe('changedTitle')
})
test('empty task array should be added when todoList added', () => {

    const newTasks = tasksReducer(tasks, addTodoListAC('new todolist', '123'))

    const keys = Object.keys(newTasks)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(newTasks[newKey]).toEqual([])
})
test('task array should be removed when todoList removed', () => {

    const newTasks = tasksReducer(tasks, removeTodolistAC('todolistId1'))

    const keys = Object.keys(newTasks)

    expect(keys.length).toBe(1)
    expect(newTasks['todolistId1']).toBeUndefined()
})
test('empty array should be added when todoLists set', () => {

    const newTasks = tasksReducer(tasks, setTodoListsAC(todoLists))

    const keys = Object.keys(newTasks)

    expect(keys.length).toBe(4)
    expect(newTasks['todolistId3']).toBeDefined()
    expect(newTasks['todolistId4']).toBeDefined()
})
test('tasks should be set for each todoLists', () => {

    const task = {
        id: '3', title: 'new task', status: TaskStatuses.New, description: '',
        completed: false, priority: 0, startDate: '', deadline: '',
        todoListId: 'todolistId2', order: 0, addedDate: '', entityStatus: "idle",
    }

    const newTasks = tasksReducer(tasks, setTasksAC('todolistId2', [task]))

    const keys = Object.keys(newTasks)

    expect(keys.length).toBe(2)
    expect(newTasks['todolistId2'].length).toBe(3)
    expect(newTasks['todolistId2'][0].id).toBe('3')
    expect(newTasks['todolistId2'][0].title).toBe('new task')
})
test('task entityStatus should be changed', () => {

    const newEntityStatus: appStatusType = 'success'

    const newTasks = tasksReducer(tasks, setTaskEntityStatusAC('todolistId2', '1', newEntityStatus))

    expect(newTasks['todolistId2'][0].entityStatus).toBe('success')
    expect(newTasks['todolistId2'][1].entityStatus).toBe('idle')
})