/*
import {v1} from "uuid";
import React, {useReducer} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "../Todolist/Todolist";
import {filterType, taskType} from "../App";
import {Grid, Paper} from "@mui/material";
import {
    addTodoListAC,
    changeStatusTodoListAC,
    changeTitleTodoListAC,
    removeTodolistAC,
    todoListReducer
} from "../state/todoList-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "../state/tasks-reducer";

export function TodoListsWithReducer() {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todolistId1, title: 'What to do', filter: 'All',},
        {id: todolistId2, title: 'What to learn', filter: 'All'},
    ])
    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Fish', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'English', isDone: true},
        ],
    })

    const deleteTask = (id: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(id, todolistId))
    }
    const addTask = (title: string, todolistId: string) => {
        dispatchTasks(addTaskAC(title, todolistId))
    }
    const changeStatusTask = (id: string, isDone: boolean, todolistId: string) => {
        dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
    }
    const changeTitleTask = (id: string, newTitle: string, todolistId: string) => {
        dispatchTasks(changeTaskTitleAC(id, newTitle, todolistId))
    }

    const changeFilterTodolist = (filter: filterType, todolistId: string) => {
        dispatchTodoLists(changeStatusTodoListAC(todolistId, filter))
    }
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodolist = (todolistTitle: string) => {
        const action = addTodoListAC(todolistTitle)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const changeTodolistTitle = (todoListId: string, newTitle: string) => {
        dispatchTodoLists(changeTitleTodoListAC(todoListId, newTitle))
    }
    return <Grid container>
        <Grid container>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        {todoLists.map(tl => {
            let filteredTasks: taskType[] = tasks[tl.id]
            if (tl.filter === 'Completed') {
                filteredTasks = tasks[tl.id].filter(t => t.isDone)
            }
            if (tl.filter === 'InProgress') {
                filteredTasks = tasks[tl.id].filter(t => !t.isDone)
            }

            return <Grid item style={{margin: "20px"}}>
                <Paper elevation={6} style={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        filterTasks={changeFilterTodolist}
                        addTask={addTask}
                        changeStatus={changeStatusTask}
                        changeTitle={changeTitleTask}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        })}
    </Grid>
}*/
